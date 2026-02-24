"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStake2Ship } from "@/hooks/initialize.task";
import { X } from "lucide-react";

export default function Hero() {
  const { publicKey } = useWallet();
  const { initializeTask } = useStake2Ship();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
  });

  // Open Modal
  const handleOpenModal = () => {
    if (!publicKey) {
      alert(
        "/// SYSTEM ALERT: WALLET DISCONNECTED. PLEASE CONNECT TO INITIATE ESCROW ///"
      );
      return;
    }
    setIsModalOpen(true);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uniqueTaskId = Math.floor(Date.now() / 1000);
    const bountyAmount = parseFloat(formData.amount);

    if (isNaN(bountyAmount) || bountyAmount <= 0) {
      alert("/// INVALID AMOUNT ///");
      return;
    }

    try {
      setIsSubmitting(true);

      await initializeTask(
        uniqueTaskId,
        formData.title,
        formData.description,
        bountyAmount
      );
      const signature = await initializeTask(
        uniqueTaskId,
        formData.title,
        formData.description,
        bountyAmount
      );


      // Close modal on success
      setIsModalOpen(false);
      setFormData({ title: "", description: "", amount: "" });

      alert("/// ESCROW DEPLOYED SUCCESSFULLY ///");
    } catch (error) {
      console.error(error);
      console.error(error);
      alert("/// TRANSACTION FAILED. CHECK CONSOLE FOR LOGS. ///")
      alert("/// TRANSACTION FAILED ///");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ---------------- MODAL ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border-2 border-white bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-white p-4">
              <div className="font-black tracking-widest text-lg">
                INIT_ESCROW<span className="animate-pulse">_</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                <X />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 flex flex-col gap-6"
            >
              <input
                type="text"
                maxLength={50}
                required
                placeholder="TASK TITLE"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-transparent border-b-2 border-gray-600 focus:border-white outline-none py-2"
              />

              <textarea
                maxLength={300}
                required
                placeholder="TASK DESCRIPTION"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-transparent border-b-2 border-gray-600 focus:border-white outline-none py-2 resize-none"
              />

              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                placeholder="BOUNTY AMOUNT"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="bg-transparent border-b-2 border-gray-600 focus:border-white outline-none py-2 text-xl"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="border-2 border-white bg-white text-black py-3 font-black hover:bg-black hover:text-white transition-colors disabled:opacity-50"
              >
                {isSubmitting
                  ? "[ DEPLOYING... ]"
                  : "[ DEPLOY_TO_DEVNET ]"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- HERO ---------------- */}
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-3 border border-white px-4 py-2 mb-10 text-xs font-bold tracking-widest bg-black">
          <span className="animate-pulse text-green-400">■</span>
          /// SYSTEM ALERT: DEVNET DEPLOYMENT LIVE ///
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
          TRUSTLESS <br />
          <span className="bg-white text-black px-4 ml-2">
            ESCROW
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-400 mb-12 text-sm md:text-base normal-case border-l-2 border-white pl-4 text-left">
          // Lock USDC. Stake SOL. Ship code. No middlemen required.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={handleOpenModal}
            className="border-2 border-white px-8 py-4 bg-white text-black font-black hover:bg-transparent hover:text-white transition-all text-lg"
          >
            [ INITIALIZE_TASK ]
          </button>

          <button className="border-2 border-white px-8 py-4 bg-black text-white hover:bg-white/10 transition-all font-bold">
            VIEW_CONTRACTS
          </button>
        </div>
      </div>
    </>
  );
}