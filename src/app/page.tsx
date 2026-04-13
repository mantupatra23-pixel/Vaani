"use client";
import React from 'react';
import { Activity, Wallet, Bot, ChevronRight, PhoneCall } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Navigation / Logo */}
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <PhoneCall size={20} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter italic">VAANI<span className="text-blue-500 italic">AI</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="hover:text-white transition-colors">Agents</a>
            <a href="#" className="hover:text-white transition-colors">Billing</a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Bharat-First AI Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Powering Next-Gen <br />Voice Automation.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Premium AI Calling infrastructure by <span className="text-white font-semibold">Visora AI</span>. Built for scale, speed, and Indian regional nuances.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard icon={<Activity className="text-blue-500" />} label="Active Calls" value="0" />
          <StatCard icon={<Wallet className="text-green-500" />} label="Wallet Balance" value="₹0.00" />
          <StatCard icon={<Bot className="text-purple-500" />} label="AI Agents" value="Ready" />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center">
          <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/10">
            Launch Dashboard
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-6 text-sm text-gray-500">No credit card required to explore</p>
        </div>
      </div>
    </main>
  );
}

// Reusable Stat Card Component
function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/50 transition-all duration-700"></div>
      <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">{label}</div>
      <div className="text-3xl font-mono font-medium">{value}</div>
    </div>
  );
}
