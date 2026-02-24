"use client";

import { Gavel, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

export default function Justice() {
  return (
    <div className="mt-32 border-4 border-white p-8 md:p-12 relative overflow-hidden bg-black">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Scale className="w-48 h-48" />
      </div>

      <div className="relative z-10">
        <div className="inline-block bg-green-400 text-black px-4 py-1 font-black text-sm mb-6">
          NEW_PROTOCOL_LAYER: JUSTICE_AS_A_SERVICE
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black mb-10 leading-none">
          STAKE YOUR REPUTATION.<br/>RESOLVE THE_UNKNOWN.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <div className="flex flex-col gap-4">
            <AlertCircle className="text-green-400 w-8 h-8" />
            <h4 className="font-black text-lg underline decoration-green-400 underline-offset-8">THE DISPUTE</h4>
            <p className="text-xs text-gray-400 font-bold leading-relaxed">
              When a Client denies work or a Worker fails the spec, the contract locks. The code doesn't know who is right. Humans do.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <ShieldCheck className="text-green-400 w-8 h-8" />
            <h4 className="font-black text-lg underline decoration-green-400 underline-offset-8">THE STAKE</h4>
            <p className="text-xs text-gray-400 font-bold leading-relaxed">
              Arbitrators stake SOL to verify their expertise. Lazy or malicious voting results in slashing. Skin in the game is the law.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Scale className="text-green-400 w-8 h-8" />
            <h4 className="font-black text-lg underline decoration-green-400 underline-offset-8">THE VERDICT</h4>
            <p className="text-xs text-gray-400 font-bold leading-relaxed">
              Jury majority triggers the PDA. Funds are dispersed trustlessly to the winner. Arbitrators earn 1% of the bounty.
            </p>
          </div>
        </div>

        <button className="mt-16 w-full md:w-auto border-2 border-white bg-white text-black px-12 py-5 font-black text-xl hover:bg-green-400 hover:border-green-400 transition-all flex items-center justify-center gap-4 group">
          JOIN THE HIGH COURT <Gavel className="group-hover:rotate-45 transition-transform" />
        </button>
      </div>
    </div>
  );
}