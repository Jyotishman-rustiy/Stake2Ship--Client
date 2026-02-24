import React from 'react'

const Architecture = () => {
  return (
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
  )
}

export default Architecture