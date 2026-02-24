import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState, useCallback } from 'react';
import * as borsh from 'borsh';
import { taskAccountSchema } from '@/utils/borshSchema';

const PROGRAM_ID = new PublicKey("FTWeRFMXmcHxhXzw4Jyo96BhXJ5bu1eAekWhunJ1s5Hb");

interface TaskAccount {
  is_initialized: boolean;
  task_id: bigint;
  client: Uint8Array;
  worker: Uint8Array;
  title: string;
  description: string;
  amount: bigint;
  status: number;
  created_at: bigint;
  is_paid: boolean; 
}

export interface ParsedTask {
  pda: string;
  taskId: string;
  client: string;      
  rawClient: string;   
  worker: string;
  rawWorker: string;   
  title: string;
  description: string;
  amount: string;      
  stakeReq: string;
  status: string;
  deadline: string;
}

export function useFetchTasks() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  
  const [allTasks, setAllTasks] = useState<ParsedTask[]>([]);
  const [clientTasks, setClientTasks] = useState<ParsedTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllTasks = useCallback(async () => {
    setIsLoading(true);
    
    try {
      console.log("/// FETCHING ON-CHAIN DATA ///");

      const accounts = await connection.getProgramAccounts(PROGRAM_ID);
      const parsed: ParsedTask[] = [];

      for (const account of accounts) {
        try {
          const decoded = borsh.deserialize(taskAccountSchema, account.account.data) as TaskAccount | null;
         
          if (!decoded || !decoded.is_initialized) continue;
          
         
          const rawWorker = new PublicKey(decoded.worker).toBase58();
          const formattedWorker = rawWorker === "11111111111111111111111111111111" 
            ? "UNASSIGNED" 
            : `${rawWorker.slice(0, 4)}...${rawWorker.slice(-4)}`;

          const rawClient = new PublicKey(decoded.client).toBase58();
          const formattedClient = `${rawClient.slice(0, 4)}...${rawClient.slice(-4)}`;

         
          const amountUi = Number(decoded.amount) / 1_000_000_000;
          const formattedBounty = `${amountUi.toLocaleString()} USDC`;
          const formattedStake = `${(amountUi * 0.1).toFixed(1)} SOL`;

          
          const shortId = decoded.task_id.toString().slice(-4);
          const statusMap = ['OPEN', 'FUNDED', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED', 'CANCELLED'];
          
          const date = new Date(Number(decoded.created_at) * 1000).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          }).toUpperCase();

        parsed.push({
            pda: account.pubkey.toBase58(),
            taskId: shortId,
            client: formattedClient,
            rawClient: rawClient, 
            worker: formattedWorker,
            rawWorker: rawWorker,
            title: decoded.title,
            description: decoded.description,
            amount: formattedBounty, 
            stakeReq: formattedStake, 
            status: statusMap[decoded.status] || 'UNKNOWN',
            deadline: date, 
          });
        } catch (e) {
        
          console.error(`Failed to decode account ${account.pubkey.toBase58()}:`, e);
          continue; 
        }
      }

      setAllTasks(parsed);

  
      if (publicKey) {
        const myTasks = parsed.filter(
          (t) => t.rawClient === publicKey.toBase58()
        );
        setClientTasks(myTasks);
      }

    } catch (error) {
      console.error("/// FAILED TO FETCH PROGRAM ACCOUNTS ///", error);
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey]);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  return { allTasks, clientTasks, isLoading, refetch: fetchAllTasks };
}