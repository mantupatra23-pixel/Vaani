import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center bg-[#050505]">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          VAANI AI
        </h1>
        <p className="text-gray-400 mt-4 text-lg max-w-md">
          Premium AI Calling Infrastructure by Visora AI.
        </p>
      </div>

      {/* Stats Grid - Just for UI Vibe right now */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="glass p-8 flex flex-col items-center">
          <span className="text-gray-500 text-sm uppercase">Active Calls</span>
          <span className="text-3xl font-mono mt-2">0</span>
        </div>
        <div className="glass p-8 flex flex-col items-center">
          <span className="text-gray-500 text-sm uppercase">Wallet Balance</span>
          <span className="text-3xl font-mono mt-2 text-green-500">₹0.00</span>
        </div>
        <div className="glass p-8 flex flex-col items-center">
          <span className="text-gray-500 text-sm uppercase">AI Agents</span>
          <span className="text-3xl font-mono mt-2">Ready</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="mt-12 px-8 py-4 bg-blue-600 hover:bg-blue-500 transition-all rounded-full font-bold shadow-lg shadow-blue-500/20">
        Launch Dashboard
      </button>
    </main>
  );
}
