import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { Buffer } from 'buffer';

const PROGRAM_ID = new PublicKey("8nNa9rpTmke4c6ii6gFzFtrgTDL6rRs7EmAjGRZ7Dv4P");

export function useCompleteTask() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const completeTask = async (taskPdaString: string) => {
    if (!publicKey) {
      alert("Connect wallet first");
      return null;
    }

    try {
      console.log("/// INITIATING TASK COMPLETION ///");

 
      const dataBuffer = Buffer.from([2]);
      const taskPda = new PublicKey(taskPdaString);

      const ix = new TransactionInstruction({
        programId: PROGRAM_ID,
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },  
          { pubkey: taskPda, isSigner: false, isWritable: true },   
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

      console.log("Task marked as completed!");
      return signature;

    } catch (err: any) {
      console.error("CompleteTask failed:", err);
      alert("Failed: " + (err.message || "Check console for details"));
      throw err;
    }
  };

  return { completeTask };
}