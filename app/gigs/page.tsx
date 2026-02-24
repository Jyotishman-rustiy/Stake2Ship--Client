"use client";

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Search, Terminal, Zap, ArrowRight } from 'lucide-react';
import { useFetchTasks } from '@/hooks/useFetchTasks';
import { useAcceptTask } from '@/hooks/useAcceptTask';
import Link from 'next/link';

export default function Marketplace() {
  const { publicKey } = useWallet();
  const { allTasks, isLoading, refetch } = useFetchTasks();
  const { acceptTask } = useAcceptTask();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const openGigs = allTasks.filter(task => 
    task.status === 'OPEN' && 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClaimTask = async (taskPda: string, stakeReqString: string) => {
    const stakeAmount = parseFloat(stakeReqString.replace(' SOL', ''));
    
    try {
      setProcessingId(taskPda);
     
      const sig = await acceptTask(taskPda, stakeAmount);
      alert(`/// GIG CLAIMED ///\nTX: ${sig}`);
      refetch(); 
    } catch (error) {
      console.error(error);
      alert("/// TRANSACTION FAILED. CHECK CONSOLE. ///");
    } finally {
      setProcessingId(null);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white font-mono uppercase selection:bg-white selection:text-black p-6 md:p-12 pb-24 relative">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col h-full">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b-2 border-white pb-6 gap-6">
          <div>
            <div className="text-3xl font-black tracking-widest flex items-center gap-2 mb-2">
              <span className="bg-white text-black px-2 py-1">S2S</span>
              GIG_TERMINAL<span className="animate-pulse">_</span>
            </div>
            <Link href="/dashboard" className="text-xs text-gray-400 font-bold tracking-widest hover:text-white transition-colors">
              &lt;- RETURN TO DASHBOARD
            </Link>
          </div>
          <div className="hidden md:block">
            <WalletMultiButton className="brutalist-wallet-btn" />
          </div>
        </header>

  
        <div className="flex mb-12 items-center border-2 border-white p-4 bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          <div className="flex-1 w-full relative flex items-center">
            <Terminal className="absolute left-4 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="SEARCH OPEN BOUNTIES..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b-2 border-dashed border-gray-600 focus:border-white outline-none py-3 pl-12 pr-4 text-white font-bold tracking-widest placeholder:text-gray-600 transition-colors"
            />
          </div>
        </div>

        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {isLoading ? (
             <div className="col-span-1 xl:col-span-2 text-center p-20 border-2 border-dashed border-gray-700 animate-pulse text-gray-500 font-bold tracking-widest">
               [ SCANNING_NETWORK_FOR_LIQUIDITY... ]
             </div>
          ) : openGigs.length === 0 ? (
             <div className="col-span-1 xl:col-span-2 text-center p-20 border-2 border-dashed border-gray-700 text-gray-500 font-bold tracking-widest">
               NO_OPEN_GIGS_FOUND
             </div>
          ) : (
            openGigs.map((gig) => (
              <div key={gig.pda} className="border-2 border-white bg-black relative group flex flex-col hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200">
                
                <div className="border-b-2 border-white p-4 flex justify-between items-center bg-white/5 group-hover:bg-white/10 transition-colors">
                  <div className="flex gap-4 items-center">
                    <span className="text-sm font-black bg-white text-black px-2 py-1">#{gig.taskId}</span>
                    <span className="text-xs font-bold flex items-center gap-1 text-green-400">
                      <Zap className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-bold">CREATED: {gig.deadline}</div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-gray-500 font-bold mb-2">ISSUER: {gig.client}</div>
                    <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight">{gig.title}</h3>
                    <p className="text-sm text-gray-400 mb-8 border-l-2 border-gray-700 pl-4">{gig.description}</p>
                  </div>

                  <div className="border-t border-dashed border-gray-600 pt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex gap-8">
                      <div>
                        <div className="text-xs text-gray-500 font-bold mb-1">BOUNTY REWARD</div>
                        <div className="text-2xl font-black text-white">{gig.amount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-bold mb-1">REQUIRED STAKE</div>
                        <div className="text-2xl font-black text-gray-400">{gig.stakeReq}</div>
                      </div>
                    </div>
                    
                  <button 
    onClick={() => handleClaimTask(gig.pda, gig.stakeReq)}
    disabled={processingId === gig.pda || !publicKey}
    className="w-full md:w-auto border-2 border-white bg-white text-black px-6 py-4 font-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {processingId === gig.pda ? '[ STAKING_SOL... ]' : (
       <><Zap className="w-5 h-5 fill-current" /> STAKE & CLAIM</>
    )}
  </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}