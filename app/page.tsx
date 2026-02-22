"use client"
import HomeHero from '@/components/ui/hero.home';
import { useStake2Ship } from '@/hooks/initialize.task';
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
export default function Stake2ShipLanding() {

  
  return (
    <div className="min-h-screen bg-black text-white font-mono uppercase selection:bg-white selection:text-black pb-20">
      {/* Brutalist Grid Background */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        
        {/* Navigation */}
        <header className="flex justify-between items-center mb-24 border-b border-white pb-6">
          <div className="text-2xl font-black tracking-widest flex items-center gap-2">
            <span className="bg-white text-black px-2 py-1">S2S</span>
            STAKE<span className="text-gray-600">2</span>SHIP<span className="animate-pulse">_</span>
          </div>
       <WalletMultiButton className="brutalist-wallet-btn" />
        </header>

        {/* Hero Section */}
       <HomeHero/>
        {/* System Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-2 border-white mb-32 bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          <div className="p-6 border-b md:border-b-0 md:border-r border-white text-center hover:bg-white/5 transition-colors">
            <div className="text-4xl font-black mb-2">100%</div>
            <div className="text-xs text-gray-400 tracking-widest font-bold">ON-CHAIN</div>
          </div>
          <div className="p-6 border-b md:border-b-0 md:border-r border-white text-center hover:bg-white/5 transition-colors">
            <div className="text-4xl font-black mb-2">0</div>
            <div className="text-xs text-gray-400 tracking-widest font-bold">TRUST REQUIRED</div>
          </div>
          <div className="p-6 border-b md:border-b-0 md:border-r border-white text-center hover:bg-white/5 transition-colors">
            <div className="text-4xl font-black mb-2">SVM</div>
            <div className="text-xs text-gray-400 tracking-widest font-bold">NATIVE RUST</div>
          </div>
          <div className="p-6 text-center hover:bg-white/5 transition-colors">
             <div className="text-4xl font-black mb-2">&lt; 1s</div>
             <div className="text-xs text-gray-400 tracking-widest font-bold">SETTLEMENT</div>
          </div>
        </div>

        {/* Architecture Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-black mb-10 border-b-2 border-white pb-4 tracking-widest">
            THE ESCROW LIFECYCLE
          </h2>
          
          <div className="space-y-6">
            <div className="border-2 border-white p-6 bg-black flex flex-col md:flex-row gap-6 items-start hover:bg-white/5 transition-colors">
              <div className="text-2xl font-black border-2 border-white px-4 py-2 bg-white text-black">01</div>
              <div>
                <h3 className="text-xl font-bold mb-3 tracking-wide">CLIENT INITIALIZATION</h3>
                <p className="text-gray-400 text-sm normal-case leading-relaxed">
                  Client funds a PDA vault with USDC, defining the bounty payout and the required SOL commitment fee. Handled strictly via native System Program CPIs.
                </p>
              </div>
            </div>

            <div className="border-2 border-white p-6 bg-black flex flex-col md:flex-row gap-6 items-start hover:bg-white/5 transition-colors">
              <div className="text-2xl font-black border-2 border-white px-4 py-2 bg-white text-black">02</div>
              <div>
                <h3 className="text-xl font-bold mb-3 tracking-wide">WORKER STAKE</h3>
                <p className="text-gray-400 text-sm normal-case leading-relaxed">
                  Developer stakes native SOL into the PDA to claim the task. This ensures absolute skin in the game and algorithmically filters out low-effort applicants.
                </p>
              </div>
            </div>

            <div className="border-2 border-white p-6 bg-black flex flex-col md:flex-row gap-6 items-start hover:bg-white/5 transition-colors">
              <div className="text-2xl font-black border-2 border-white px-4 py-2 bg-white text-black">03</div>
              <div>
                <h3 className="text-xl font-bold mb-3 tracking-wide">SETTLEMENT & PAYOUT</h3>
                <p className="text-gray-400 text-sm normal-case leading-relaxed">
                  Upon successful completion, the USDC bounty and the staked SOL are routed to the developer. On failure, the client reclaims the bounty and absorbs the developer's stake as a penalty.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Contracts / Mock Bounties */}
         <div>
          <h2 className="text-3xl font-black mb-10 border-b-2 border-white pb-4 tracking-widest flex items-center justify-between">
            <span>LIVE CONTRACTS</span>
            <span className="text-xs border border-white px-3 py-1 animate-pulse">2 ACTIVE</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mock Card 1 */}
            <div className="border-2 border-white p-8 bg-black relative group cursor-crosshair">
              <div className="absolute inset-0 bg-white translate-x-3 translate-y-3 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200"></div>
              
              <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-600 pb-4">
                <span className="text-xs bg-white text-black px-2 py-1 font-bold">ESCROW #001</span>
                <span className="text-xs text-gray-400 font-bold">DEADLINE: FEB 27 2026</span>
              </div>
              
              <h3 className="text-2xl font-black mb-8 text-white leading-tight">SUPERTEAM FELLOWSHIP POC</h3>
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1 font-bold">REWARD POOL</div>
                  <div className="text-3xl font-black">2,500 USDC</div>
                </div>
                <button className="text-sm font-bold underline underline-offset-4 hover:text-gray-400">VIEW_TX</button>
              </div>
            </div>

            {/* Mock Card 2 */}
            <div className="border-2 border-white p-8 bg-black relative group cursor-crosshair">
              <div className="absolute inset-0 bg-white translate-x-3 translate-y-3 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200"></div>
              
              <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-600 pb-4">
                <span className="text-xs bg-white text-black px-2 py-1 font-bold">ESCROW #002</span>
                <span className="text-xs text-green-400 animate-pulse font-bold">IN PROGRESS</span>
              </div>
              
              <h3 className="text-2xl font-black mb-8 text-white leading-tight">SECURE REMOTE WEB3 ROLE</h3>
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1 font-bold">TARGET COMPENSATION</div>
                  <div className="text-3xl font-black">50 LPA</div>
                </div>
                <div className="text-xs text-gray-400 text-right font-bold">
                  UNLOCK DATE<br/>SEP 28 2026
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}