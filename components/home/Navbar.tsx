import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const Navbar = () => {
  return (
    <header className="flex justify-between items-center mb-24 border-b border-white pb-6">
              <div className="text-2xl font-black tracking-widest flex items-center gap-2">
                <span className="bg-white text-black px-2 py-1">S2S</span>
                STAKE<span className="text-gray-600">2</span>SHIP<span className="animate-pulse">_</span>
              </div>
           <WalletMultiButton className="brutalist-wallet-btn" />
            </header>
  )
}

export default Navbar