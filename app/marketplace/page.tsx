"use client";

import React, { useState } from 'react';
import { Search, Filter, Terminal, ArrowRight, Zap } from 'lucide-react';

const MOCK_GIGS = [
  { id: '099', title: 'NATIVE RUST AMM CONTRACT', client: '0x7F...3B1A', bounty: '4500 USDC', stake: '3.0 SOL', tags: ['RUST', 'SVM', 'MATH'], difficulty: 'ELITE', deadline: 'MAR 15 2026' },
  { id: '104', title: 'BUILD SUPERTEAM ESCROW POC', client: 'SUPERTEAM_DAO', bounty: '2500 USDC', stake: '1.5 SOL', tags: ['RUST', 'NEXTJS', 'PDAS'], difficulty: 'HARD', deadline: 'FEB 27 2026' },
  { id: '105', title: 'INTEGRATE JUPITER SWAP API', client: 'DEFI_NINJA', bounty: '800 USDC', stake: '0.5 SOL', tags: ['TYPESCRIPT', 'REACT', 'API'], difficulty: 'MEDIUM', deadline: 'MAR 02 2026' },
  { id: '108', title: 'WRITE TOKEN VESTING TESTS', client: '0x22...9C8D', bounty: '400 USDC', stake: '0.2 SOL', tags: ['MOCHA', 'ANCHOR', 'QA'], difficulty: 'EASY', deadline: 'FEB 25 2026' },
];

const CATEGORIES = ['ALL_GIGS', 'RUST_PROGRAMS', 'FRONTEND_UI', 'DEFI_LOGIC', 'AUDITS'];

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('ALL_GIGS');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-black text-white font-mono uppercase selection:bg-white selection:text-black p-6 md:p-12 pb-24">
      
      {/* Brutalist Grid Background */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col h-full">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-3 border border-white px-4 py-2 mb-6 text-xs font-bold tracking-widest bg-black">
            <span className="animate-pulse text-green-400">■</span> 
            NETWORK: DEVNET // 24 ACTIVE BOUNTIES
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
            GIG <span className="bg-white text-black px-4 ml-2">TERMINAL</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm normal-case border-l-2 border-white pl-4">
            // Browse open contracts. Filter by stack. Lock your SOL to claim the gig. Failure to ship results in stake slashing. Proceed with absolute conviction.
          </p>
        </header>

        {/* Command Line Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between border-2 border-white p-4 bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          
          <div className="flex-1 w-full relative flex items-center">
            <Terminal className="absolute left-4 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="SEARCH BY SKILL OR TITLE..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b-2 border-dashed border-gray-600 focus:border-white outline-none py-3 pl-12 pr-4 text-white font-bold tracking-widest placeholder:text-gray-600 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs font-bold border ${activeTab === cat ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white'} transition-all`}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>

        {/* Gig Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {MOCK_GIGS.map((gig) => (
            <div key={gig.id} className="border-2 border-white bg-black relative group flex flex-col hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200">
              
              {/* Card Header */}
              <div className="border-b-2 border-white p-4 flex justify-between items-center bg-white/5 group-hover:bg-white/10 transition-colors">
                <div className="flex gap-4 items-center">
                  <span className="text-sm font-black bg-white text-black px-2 py-1">#{gig.id}</span>
                  <span className={`text-xs font-bold flex items-center gap-1 ${gig.difficulty === 'ELITE' ? 'text-red-400' : gig.difficulty === 'HARD' ? 'text-orange-400' : 'text-green-400'}`}>
                    <Zap className="w-3 h-3" /> {gig.difficulty}
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-bold">DEADLINE: {gig.deadline}</div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-500 font-bold mb-2">ISSUER: {gig.client}</div>
                  <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight">{gig.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {gig.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold border border-gray-600 px-3 py-1 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Financials & Action */}
                <div className="border-t border-dashed border-gray-600 pt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div className="flex gap-8">
                    <div>
                      <div className="text-xs text-gray-500 font-bold mb-1">BOUNTY REWARD</div>
                      <div className="text-2xl font-black text-white">{gig.bounty}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-bold mb-1">REQUIRED STAKE</div>
                      <div className="text-2xl font-black text-gray-400">{gig.stake}</div>
                    </div>
                  </div>
                  
                  <button className="w-full md:w-auto border-2 border-white bg-white text-black px-6 py-4 font-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                    STAKE & CLAIM <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}