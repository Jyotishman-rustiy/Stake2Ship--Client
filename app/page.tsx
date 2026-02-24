"use client"

import Hero from '@/components/home/Hero';
import Navbar from '@/components/home/Navbar';
import Stats from '@/components/home/Stats.Row';
import Architecture from '@/components/home/Architecture';
import LiveContracts from '@/components/home/LiveContracts';
import Justice from '@/components/home/Justice'; 
export default function Stake2ShipLanding() {
  return (
    <div className="min-h-screen bg-black text-white font-mono uppercase selection:bg-white selection:text-black pb-20">
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <Navbar/>
        <Hero/>
        <Stats/>
        <Architecture/>
        <Justice/> 
        <LiveContracts/>
      </div>
    </div>
  )
}