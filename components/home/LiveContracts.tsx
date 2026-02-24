"use client";

import React from "react";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import { Zap, ExternalLink, Gavel } from "lucide-react";

const LiveContracts = () => {
  const { allTasks, isLoading } = useFetchTasks();

  // Show only the 4 most recent tasks
  const recentTasks = allTasks.slice(0, 4);

  return (
    <div className="mt-24 max-w-6xl mx-auto px-4">
      {/* HEADER */}
      <h2 className="text-3xl font-black mb-10 border-b-2 border-white pb-4 tracking-widest flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span>NETWORK_LIVE_LEDGER</span>

        <span className="text-xs border-2 border-green-400 text-green-400 px-3 py-1 animate-pulse flex items-center gap-2">
          <Zap className="w-3 h-3 fill-current" />
          {allTasks.length} ACTIVE_ESCROWS
        </span>
      </h2>

      {/* LOADING */}
      {isLoading ? (
        <div className="p-20 border-2 border-dashed border-gray-800 text-center font-bold text-gray-600">
          [ SCANNING_SOLANA_MAINNET_MIRROR... ]
        </div>
      ) : (
        <>
          {/* TASK GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {recentTasks.map((task) => (
              <div
                key={task.pda}
                className="border-2 border-white p-8 bg-black relative group cursor-crosshair hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all"
              >
                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-700 pb-4">
                  <span className="text-xs bg-white text-black px-2 py-1 font-bold">
                    TASK #{task.taskId}
                  </span>

                  <span
                    className={`text-[10px] font-black tracking-tighter ${
                      task.status === "OPEN"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    STATUS: {task.status}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-black mb-8 text-white leading-tight h-14 overflow-hidden">
                  {task.title}
                </h3>

                {/* FOOTER */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-gray-500 mb-1 font-bold tracking-widest">
                      LIQUIDITY LOCKED
                    </div>
                    <div className="text-3xl font-black">
                      {task.amount}
                    </div>
                  </div>

                  <a
                    href={`https://explorer.solana.com/address/${task.pda}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-black border-2 border-white px-3 py-1 hover:bg-white hover:text-black transition-colors flex items-center gap-2"
                  >
                    VIEW_ON_CHAIN
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA SECTION (Now Properly Centered Below Grid) */}
          <div className="mt-16 flex justify-center">
            <div className="w-full md:w-[500px] border-2 border-dashed border-green-400 p-10 bg-green-400/5 flex flex-col justify-center items-center text-center group hover:bg-green-400/10 transition-colors">
              <Gavel className="w-12 h-12 text-green-400 mb-4 group-hover:rotate-12 transition-transform" />

              <h3 className="text-xl font-black mb-3 text-green-400 tracking-wider">
                BECOME_THE_ARBITRATOR
              </h3>

              <p className="text-[10px] text-gray-400 font-bold mb-6 max-w-[280px]">
                STAKE SOL • JOIN JURY • RESOLVE DISPUTES • EARN PROTOCOL FEES
              </p>

              <button className="bg-green-400 text-black px-8 py-2 font-black text-xs hover:scale-105 transition-transform">
                STAKE_FOR_JUSTICE
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveContracts;