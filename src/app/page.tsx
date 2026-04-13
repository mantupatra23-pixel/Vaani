"use client";
import React, { useState, useEffect } from 'react';
import { 
  Activity, Wallet, Bot, ChevronRight, PhoneCall, 
  Settings, Mic2, Play, Plus, Zap, BarChart3, ShieldCheck
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ calls: 0, balance: 0, agents: 'Ready' });

  // 1. Real-Time Data Simulation (Backend Link Logic)
  useEffect(() => {
    // Yahan hum aapka FastAPI Backend link karenge baad mein
    const fetchStats = () => {
      setStats({
        calls: Math.floor(Math.random() * 5), // Simulating live calls
        balance: 1450.50,
        agents: 'Connected'
      });
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Har 10 sec mein update
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        
        {/* Modern Header */}
        <nav className="flex justify-between items-center mb-16 glass px-6 py-4 border-white/5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <PhoneCall size={22} strokeWidth={2.5} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none italic">VAANI<span className="text-blue-500">AI</span></span>
              <span className="text-[10px] uppercase tracking-[3px] text-gray-500 font-bold">Visora Suite</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-400">
              <button onClick={() => setActiveTab('overview')} className={`hover:text-white transition-all ${activeTab === 'overview' ? 'text-blue-400' : ''}`}>Overview</button>
              <button onClick={() => setActiveTab('studio')} className={`hover:text-white transition-all ${activeTab === 'studio' ? 'text-blue-400' : ''}`}>Agent Studio</button>
              <button className="hover:text-white transition-all">Billing</button>
            </div>
            <button className="bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10 transition-all">
              <Settings size={20} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </nav>

        {activeTab === 'overview' ? (
          <>
            {/* Hero & Status */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 tracking-widest uppercase shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Infrastructure v1.0 Live in India
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
                <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">Fastest AI</span> <br />
                <span className="text-blue-500">Voice Agents.</span>
              </h1>
            </div>

            {/* Stats Grid with 3D Effect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <StatCard 
                icon={<Activity className="text-blue-400" />} 
                label="Active Calls" 
                value={stats.calls.toString()} 
                trend="+12% today"
              />
              <StatCard 
                icon={<Wallet className="text-green-400" />} 
                label="Wallet Credits" 
                value={`₹${stats.balance}`} 
                trend="Auto-refill On"
              />
              <StatCard 
                icon={<Bot className="text-purple-400" />} 
                label="Engine Status" 
                value={stats.agents} 
                trend="Latency: 45ms"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 group cursor-pointer hover:bg-white/5 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400">
                    <Zap size={28} />
                  </div>
                  <ChevronRight className="text-gray-600 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Instant Deployment</h3>
                <p className="text-gray-500 leading-relaxed">Connect your API key and start making automated Indian regional calls in under 60 seconds.</p>
              </div>
              
              <div className="glass p-8 group cursor-pointer hover:bg-white/5 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400">
                    <BarChart3 size={28} />
                  </div>
                  <ChevronRight className="text-gray-600 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Deep Analytics</h3>
                <p className="text-gray-500 leading-relaxed">Analyze call logs, sentiment, and conversion rates for every single AI interaction.</p>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 2. Agent Studio UI */}
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">Agent Studio</h2>
                <p className="text-gray-400">Craft the perfect voice personality for your brand.</p>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                <Plus size={20} /> Create New Agent
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="glass p-8">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Settings size={18} className="text-blue-500" /> Basic Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Agent Name</label>
                      <input type="text" placeholder="e.g. Sales Assistant" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Voice</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 appearance-none">
                        <option>Aarav (Hindi - Male)</option>
                        <option>Ananya (Hindi - Female)</option>
                        <option>Vikram (English - Male)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="glass p-8">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Mic2 size={18} className="text-purple-500" /> System Instructions
                  </h3>
                  <textarea 
                    rows={6}
                    placeholder="Describe how your AI agent should behave..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                  <h3 className="text-lg font-bold mb-6">Test Voice</h3>
                  <div className="p-6 bg-black/40 rounded-2xl border border-white/5 mb-6 text-center">
                    <p className="text-sm italic text-gray-400 mb-6">"Namaste! Main Visora AI se bol rahi hoon. Main aapki kaise madad kar sakti hoon?"</p>
                    <button className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform shadow-xl shadow-blue-600/30">
                      <Play fill="white" className="ml-1" />
                    </button>
                  </div>
                  <button className="w-full py-4 glass border-white/10 font-bold hover:bg-white/5 transition-all">
                    Save Personality
                  </button>
                </div>
                
                <div className="glass p-6 flex items-center gap-4 text-green-400">
                  <ShieldCheck size={24} />
                  <div className="text-sm font-bold tracking-tight">Enterprise Ready Security</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Branding */}
      <footer className="mt-20 border-t border-white/5 py-12 text-center relative z-10">
        <p className="text-gray-600 text-sm font-medium tracking-widest uppercase">
          Propulsion by <span className="text-white">Visora AI Labs</span> — Bharat 2026
        </p>
      </footer>
    </main>
  );
}

// 3. Reusable UI Component with Advanced Styling
function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="glass p-8 group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors"></div>
      <div className="flex justify-between items-start mb-6">
        <div className="bg-white/5 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase bg-white/5 px-2 py-1 rounded border border-white/5">
          Live
        </span>
      </div>
      <div className="text-gray-400 text-[11px] font-black uppercase tracking-[2px] mb-2">{label}</div>
      <div className="text-4xl font-mono font-medium mb-4 group-hover:text-blue-400 transition-colors">{value}</div>
      <div className="text-xs font-bold text-gray-500 flex items-center gap-1 group-hover:text-gray-300">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        {trend}
      </div>
    </div>
  );
}
