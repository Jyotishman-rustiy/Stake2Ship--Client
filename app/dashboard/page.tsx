"use client";

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useStake2Ship } from '@/hooks/initialize.task'; // Make sure this path is correct
import { X } from 'lucide-react';
import Link from 'next/link';

// --- DUMMY DATA (We will replace this with on-chain fetching later) ---
const MOCK_CLIENT_TASKS = [
  { id: '001', title: 'SUPERTEAM ESCROW POC', bounty: '2500 USDC', stakeReq: '1.5 SOL', status: 'IN_REVIEW', worker: 'E9...a3F', deadline: 'FEB 27 2026' },
  { id: '002', title: 'RUST SMART CONTRACT AUDIT', bounty: '500 USDC', stakeReq: '0.5 SOL', status: 'OPEN', worker: 'NONE', deadline: 'MAR 05 2026' },
];

const MOCK_WORKER_TASKS = [
  { id: '089', title: 'NATIVE RUST CPI INTEGRATION', bounty: '1200 USDC', staked: '1.0 SOL', status: 'IN_PROGRESS', client: '7x...b9Q', deadline: 'FEB 24 2026' },
  { id: '092', title: 'NEXT.JS BRUTALIST UI', bounty: '800 USDC', staked: '0.5 SOL', status: 'COMPLETED', client: '2a...c1Z', deadline: 'FEB 20 2026' },
];

export default function Dashboard() {
  const { publicKey } = useWallet();
  const { initializeTask } = useStake2Ship();

  const [role, setRole] = useState<'CLIENT' | 'WORKER'>('WORKER');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', amount: '' });

  // Handle Modal Open Gatekeeper
  const handleOpenModal = () => {
    if (!publicKey) {
      alert("/// SYSTEM ALERT: WALLET DISCONNECTED ///");
      return;
    }
    setIsModalOpen(true);
  };

  // Handle Escrow Creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueTaskId = Math.floor(Date.now() / 1000);
    const bountyAmount = parseFloat(formData.amount);

    if (isNaN(bountyAmount) || bountyAmount <= 0) return alert("/// INVALID AMOUNT ///");

    try {
      setIsSubmitting(true);
      const signature = await initializeTask(uniqueTaskId, formData.title, formData.description, bountyAmount);
      setIsModalOpen(false);
      setFormData({ title: "", description: "", amount: "" });
      alert(`/// ESCROW DEPLOYED ///\nTX: ${signature}`);
    } catch (error) {
      console.error(error);
      alert("/// TRANSACTION FAILED ///");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono uppercase selection:bg-white selection:text-black p-6 md:p-12 relative">
      
      {/* ---------------- INITIALIZE TASK MODAL ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border-2 border-white bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center border-b-2 border-white p-4">
              <div className="font-black tracking-widest text-lg">
                INIT_ESCROW<span className="animate-pulse">_</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="hover:bg-white hover:text-black p-1 transition-colors">
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
              <input type="text" maxLength={50} required placeholder="TASK TITLE" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-transparent border-b-2 border-gray-600 focus:border-white outline-none py-2 transition-colors" />
              <textarea maxLength={300} required placeholder="TASK DESCRIPTION" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-transparent border-b-2 border-gray-600 focus:border-white outline-none py-2 resize-none transition-colors" />
              <input type="number" step="0.1" min="0.1" required placeholder="BOUNTY AMOUNT" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="bg-transparent border-b-2 border-gray-600 focus:border-white outline-none py-2 text-xl transition-colors" />
              
              <button type="submit" disabled={isSubmitting} className="border-2 border-white bg-white text-black py-4 font-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 text-lg">
                {isSubmitting ? "[ DEPLOYING... ]" : "[ DEPLOY_TO_DEVNET ]"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Grid Background */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col h-full">
        
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b-2 border-white pb-6 gap-6">
          <div>
            <div className="text-3xl font-black tracking-widest flex items-center gap-2 mb-2">
              <span className="bg-white text-black px-2 py-1">S2S</span>
              TERMINAL<span className="animate-pulse">_</span>
            </div>
            {/* DYNAMIC WALLET DISPLAY */}
            <div className="text-xs text-gray-400 font-bold tracking-widest flex items-center gap-2">
              STATUS: {publicKey ? (
                <span className="text-green-400">CONNECTED // {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}</span>
              ) : (
                <span className="text-red-400">OFFLINE</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Role Toggle */}
            <div className="flex border-2 border-white bg-black p-1">
              <button onClick={() => setRole('CLIENT')} className={`px-4 md:px-6 py-2 text-sm font-bold transition-colors ${role === 'CLIENT' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>
                [ CLIENT_MODE ]
              </button>
              <button onClick={() => setRole('WORKER')} className={`px-4 md:px-6 py-2 text-sm font-bold transition-colors ${role === 'WORKER' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>
                [ WORKER_MODE ]
              </button>
            </div>
            
            {/* Real Wallet Button for Dashboard */}
            <div className="hidden md:block">
              <WalletMultiButton className="brutalist-wallet-btn" />
            </div>
          </div>
        </header>

        {/* --- CLIENT DASHBOARD --- */}
        {role === 'CLIENT' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end mb-8 border-b-2 border-dashed border-gray-700 pb-4">
              <h2 className="text-2xl font-black">YOUR ACTIVE BOUNTIES</h2>
              
              {/* CONNECTED MODAL TRIGGER */}
              <button 
                onClick={handleOpenModal}
                className="border-2 border-white bg-white text-black px-6 py-3 font-bold hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                + INITIALIZE_NEW_TASK
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {MOCK_CLIENT_TASKS.map((task) => (
                <div key={task.id} className="border-2 border-white p-6 bg-black flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-dashed transition-all">
                  
                  <div className="flex-1">
                    <div className="flex gap-3 items-center mb-2">
                      <span className="text-xs bg-white text-black px-2 py-1 font-bold">#{task.id}</span>
                      <span className={`text-xs font-bold px-2 py-1 border ${task.status === 'IN_REVIEW' ? 'border-yellow-400 text-yellow-400' : 'border-gray-500 text-gray-500'}`}>
                        {task.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-black mb-1">{task.title}</h3>
                    <div className="text-xs text-gray-400">DEADLINE: {task.deadline} // WORKER: {task.worker}</div>
                  </div>

                  <div className="flex-none text-left md:text-right">
                    <div className="text-xs text-gray-500 mb-1 font-bold">LOCKED LIQUIDITY</div>
                    <div className="text-xl font-black">{task.bounty}</div>
                    <div className="text-xs text-gray-400">+ {task.stakeReq} STAKE</div>
                  </div>

                  <div className="flex-none w-full md:w-auto">
                    {task.status === 'IN_REVIEW' ? (
                      <button className="w-full border-2 border-green-400 text-green-400 px-6 py-3 font-bold hover:bg-green-400 hover:text-black transition-colors">
                        SETTLE & PAY 
                      </button>
                    ) : (
                      <button className="w-full border-2 border-gray-600 text-gray-500 px-6 py-3 font-bold cursor-not-allowed">
                        AWAITING_WORK
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- WORKER DASHBOARD --- */}
        {role === 'WORKER' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="border-2 border-white p-6">
                <div className="text-xs text-gray-400 mb-2">TOTAL EARNED</div>
                <div className="text-3xl font-black">1,800 USDC</div>
              </div>
              <div className="border-2 border-white p-6">
                <div className="text-xs text-gray-400 mb-2">ACTIVE STAKED SOL</div>
                <div className="text-3xl font-black">1.5 SOL</div>
              </div>
              
              {/* WIRED UP LINK TO MARKETPLACE */}
              <Link href="/gigs" className="border-2 border-white p-6 bg-white text-black flex items-center justify-between group hover:bg-black hover:text-white transition-colors">
                <div>
                  <div className="text-xs font-bold mb-2 text-gray-600 group-hover:text-gray-400">BROWSE MARKETPLACE</div>
                  <div className="text-xl font-black">FIND GIGS</div>
                </div>
                <div className="text-4xl group-hover:translate-x-2 transition-transform">-&gt;</div>
              </Link>
            </div>

            <h2 className="text-2xl font-black mb-8 border-b-2 border-dashed border-gray-700 pb-4">YOUR ACTIVE COMMITMENTS</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {MOCK_WORKER_TASKS.map((task) => (
                <div key={task.id} className="border-2 border-white p-6 bg-black flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden group">
                  
                  <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10"></div>

                  <div className="flex-1">
                    <div className="flex gap-3 items-center mb-2">
                      <span className="text-xs bg-white text-black px-2 py-1 font-bold">#{task.id}</span>
                      <span className={`text-xs font-bold px-2 py-1 border ${task.status === 'COMPLETED' ? 'border-green-400 text-green-400' : 'border-blue-400 text-blue-400'}`}>
                        {task.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-black mb-1">{task.title}</h3>
                    <div className="text-xs text-gray-400">DEADLINE: {task.deadline} // CLIENT: {task.client}</div>
                  </div>

                  <div className="flex-none text-left md:text-right">
                    <div className="text-xs text-gray-500 mb-1 font-bold">BOUNTY / YOUR STAKE</div>
                    <div className="text-xl font-black">{task.bounty}</div>
                    <div className="text-xs text-gray-400">{task.staked} AT RISK</div>
                  </div>

                  <div className="flex-none w-full md:w-auto">
                    {task.status === 'IN_PROGRESS' ? (
                      <button className="w-full border-2 border-white bg-white text-black px-6 py-3 font-bold hover:bg-black hover:text-white transition-colors">
                        SUBMIT_PR_LINK
                      </button>
                    ) : (
                      <button className="w-full border-2 border-gray-600 text-gray-500 px-6 py-3 font-bold cursor-not-allowed">
                        FUNDS_SETTLED
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}