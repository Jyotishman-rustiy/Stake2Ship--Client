import React from 'react'

const Stats = () => {
  return (
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
  )
}

export default Stats