import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import { Buffer } from 'buffer';

const PROGRAM_ID = new PublicKey("8nNa9rpTmke4c6ii6gFzFtrgTDL6rRs7EmAjGRZ7Dv4P");

export function useAcceptTask() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const acceptTask = async (taskPdaString: string, stakeAmountSol: number) => {
    if (!publicKey) {
      alert("Connect wallet first");
      return null;
    }

    try {
      console.log("/// INITIATING ACCEPT TASK / STAKE ///");

    
      const stakeLamports = BigInt(Math.floor(stakeAmountSol * 1_000_000_000));

      
      const dataBuffer = Buffer.alloc(9);
      dataBuffer.writeUInt8(1, 0); 
      dataBuffer.writeBigUInt64LE(stakeLamports, 1); 

      const taskPda = new PublicKey(taskPdaString);

      const ix = new TransactionInstruction({
        programId: PROGRAM_ID,
        keys: [
          { pubkey: publicKey,        isSigner: true,  isWritable: true  },
          { pubkey: taskPda,          isSigner: false, isWritable: true  },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: dataBuffer, 
      });

      const tx = new Transaction().add(ix);


      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signature = await sendTransaction(tx, connection, {
        skipPreflight: false,
      });

      console.log("Transaction sent →", signature);
        
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature
      }, 'confirmed');

      console.log("Stake & Claim confirmed!");
      return signature;

    } catch (err: any) {
      console.error("AcceptTask failed:", err);
      alert("Failed: " + (err.message || "Check console for details"));
      throw err;
    }
  };

  return { acceptTask };
}