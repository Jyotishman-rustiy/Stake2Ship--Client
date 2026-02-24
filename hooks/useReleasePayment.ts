import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { Buffer } from 'buffer';

const PROGRAM_ID = new PublicKey("FTWeRFMXmcHxhXzw4Jyo96BhXJ5bu1eAekWhunJ1s5Hb");

export function useReleasePayment() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const releasePayment = async (taskPdaString: string, workerAddressString: string) => {
    if (!publicKey) {
      alert("Connect wallet first");
      return null;
    }

    try {
      console.log("/// INITIATING PAYMENT RELEASE ///");

     
      const dataBuffer = Buffer.from([3]); 

      const taskPda = new PublicKey(taskPdaString);
      const workerPubkey = new PublicKey(workerAddressString);

     
      const ix = new TransactionInstruction({
        programId: PROGRAM_ID,
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },      
          { pubkey: workerPubkey, isSigner: false, isWritable: true },  
          { pubkey: taskPda, isSigner: false, isWritable: true },       
        ],
        data: dataBuffer, 
      });

      const tx = new Transaction().add(ix);

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signature = await sendTransaction(tx, connection, { skipPreflight: false });

      console.log("Transaction sent →", signature);
      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature }, 'confirmed');

      console.log("Funds Released!");
      return signature;

    } catch (err: any) {
      console.error("ReleasePayment failed:", err);
      alert("Failed: " + (err.message || "Check console for details"));
      throw err;
    }
  };

  return { releasePayment };
}