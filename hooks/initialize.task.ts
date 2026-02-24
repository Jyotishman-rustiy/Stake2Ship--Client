"use client"


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

const PROGRAM_ID = new PublicKey(
  "FTWeRFMXmcHxhXzw4Jyo96BhXJ5bu1eAekWhunJ1s5Hb"
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
    
    if (!publicKey) {
      const error = new Error("SYSTEM ALERT: CONNECT WALLET FIRST.");
      console.error(error);
      throw error;
    }

    try {
      console.log("/// INITIATING ESCROW DEPLOYMENT ///");

   
      const taskId = BigInt(taskIdNumber);
      const amountLamports = BigInt(amount * 1_000_000_000);

   
      const instructionData = {
        instruction: 0,
        taskId,
        title,
        description,
        amount: amountLamports,
      };

      
      const encodedData = borsh.serialize(
        initializeTaskSchema,
        instructionData
      );

   
      const taskIdBuffer = Buffer.alloc(8);
      taskIdBuffer.writeBigUInt64LE(taskId);

      const [taskPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("task"), publicKey.toBuffer(), taskIdBuffer],
        PROGRAM_ID
      );

      console.log("-> TARGET PDA DERIVED:", taskPda.toBase58());

    
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

      
      const transaction = new Transaction().add(initInstruction);

      console.log("-> AWAITING WALLET SIGNATURE...");
      const signature = await sendTransaction(transaction, connection);

      console.log("-> TRANSACTION SENT! SIGNATURE:", signature);

     
      await connection.confirmTransaction(signature, "confirmed");

      console.log("/// SYSTEM ALERT: ESCROW INITIALIZED SUCCESSFULLY ///");

  
      return signature;
    } catch (error) {
      console.error("/// SYSTEM ERROR: ESCROW DEPLOYMENT FAILED ///", error);

  
      throw error;
    }
  };

  return { initializeTask };
}