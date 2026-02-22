"use client"

// ✅ 1. REQUIRED FOR NEXT.JS (Fixes Buffer undefined issue)
import { Buffer } from "buffer";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import * as borsh from "borsh";
import { initializeTaskSchema } from "@/utils/borshSchema";

// ✅ Your real deployed devnet program ID
const PROGRAM_ID = new PublicKey(
  "8nNa9rpTmke4c6ii6gFzFtrgTDL6rRs7EmAjGRZ7Dv4P"
);

export function useStake2Ship() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const initializeTask = async (
    taskIdNumber: number,
    title: string,
    description: string,
    amount: number
  ) => {
    // ✅ Better wallet guard
    if (!publicKey) {
      const error = new Error("SYSTEM ALERT: CONNECT WALLET FIRST.");
      console.error(error);
      throw error; // 🔥 Bubble up to UI
    }

    try {
      console.log("/// INITIATING ESCROW DEPLOYMENT ///");

      // 1️⃣ Format values
      const taskId = BigInt(taskIdNumber);
      const amountLamports = BigInt(amount * 1_000_000_000);

      // 2️⃣ Match Rust enum exactly
      const instructionData = {
        instruction: 0,
        taskId,
        title,
        description,
        amount: amountLamports,
      };

      // 3️⃣ Serialize with Borsh
      const encodedData = borsh.serialize(
        initializeTaskSchema,
        instructionData
      );

      // 4️⃣ PDA Derivation (Rust to_le_bytes() match)
      const taskIdBuffer = Buffer.alloc(8);
      taskIdBuffer.writeBigUInt64LE(taskId);

      const [taskPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("task"), publicKey.toBuffer(), taskIdBuffer],
        PROGRAM_ID
      );

      console.log("-> TARGET PDA DERIVED:", taskPda.toBase58());

      // 5️⃣ Build instruction
      const initInstruction = new TransactionInstruction({
        programId: PROGRAM_ID,
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },
          { pubkey: taskPda, isSigner: false, isWritable: true },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
        data: Buffer.from(encodedData),
      });

      // 6️⃣ Send transaction
      const transaction = new Transaction().add(initInstruction);

      console.log("-> AWAITING WALLET SIGNATURE...");
      const signature = await sendTransaction(transaction, connection);

      console.log("-> TRANSACTION SENT! SIGNATURE:", signature);

      // 7️⃣ Confirm
      await connection.confirmTransaction(signature, "confirmed");

      console.log("/// SYSTEM ALERT: ESCROW INITIALIZED SUCCESSFULLY ///");

      // ✅ RETURN SIGNATURE FOR UI
      return signature;
    } catch (error) {
      console.error("/// SYSTEM ERROR: ESCROW DEPLOYMENT FAILED ///", error);

      // ✅ Bubble error to UI
      throw error;
    }
  };

  return { initializeTask };
}