"use client";
import React, { useState, useEffect } from 'react';
import { 
  Activity, Wallet, Bot, ChevronRight, PhoneCall, 
  Settings, Mic2, Play, Plus, Zap, BarChart3, ShieldCheck, X, PhoneOff, Signal
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDialer, setShowDialer] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [stats, setStats] = useState({ calls: 0, balance: 1450.50, agents: 'Ready' });

  // 1. Backend Stats Sync Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Jab call active ho, toh dashboard par live status dikhaye
      if (isCalling) {
        setStats(prev => ({ ...prev, calls: 1 }));
      } else {
        setStats(prev => ({ ...prev, calls: 0 }));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isCalling]);

  // 2. Real Twilio Backend Trigger
  const handleMakeCall = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      return alert("Please enter a valid mobile number with country code (e.g. +91...)");
    }
    
    setIsCalling(true);
    try {
      // Calling your Render Backend (Twilio Logic)
      const response = await fetch('https://ai-call-center-1-48xk.onrender.com/make-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone_number: phoneNumber, 
          agent_id: 'vaani_pro_v1',
          language: 'hindi-hinglish'
        })
      });

      if (!response.ok) throw new Error("Backend connection failed");
      console.log("Twilio Triggered Successfully");
      
    } catch (error) {
      console.error("Call Error:", error);
      alert("Backend se connect nahi ho paya. Check if server is awake.");
      setIsCalling(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Premium Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        
        {/* Navigation Bar - Glassmorphism */}
        <nav className="flex justify-between items-center mb-16 glass px-6 py-4 border-white/5 shadow-2xl sticky top-4 z-[50]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <PhoneCall size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter italic leading-none">VAANI<span className="text-blue-500">AI</span></span>
              <span className="text-[9px] uppercase tracking-[3px] text-gray-500 font-bold">Visora Suite</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <button onClick={() => setActiveTab('overview')} className={`hover:text-white transition-all ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-500 pb-1' : ''}`}>Overview</button>
              <button onClick={() => setActiveTab('studio')} className={`hover:text-white transition-all ${activeTab === 'studio' ? 'text-blue-400 border-b-2 border-blue-500 pb-1' : ''}`}>Agent Studio</button>
              <button className="hover:text-white transition-all">Logs</button>
            </div>
            <button onClick={() => setShowDialer(true)} className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all flex items-center gap-2 shadow-xl shadow-blue-600/30 active:scale-95">
              <Zap size={14} fill="white" /> New AI Call
            </button>
          </div>
        </nav>

        {activeTab === 'overview' ? (
          <div className="animate-in fade-in duration-1000">
            {/* Hero Section */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black mb-8 tracking-[2px] uppercase">
                <Signal size={12} className="animate-pulse" /> Bharat-First Infrastructure
              </div>
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
                Real-Time <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent italic">Voice Intel.</span>
              </h1>
              <p className="text-gray-500 max-w-2xl text-xl font-medium leading-relaxed">
                Connect your Twilio backend and launch ultra-low latency AI agents with <span className="text-white">Visora's V4 Logic</span>.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <StatCard icon={<Activity className="text-blue-400" />} label="Active Calls" value={stats.calls.toString()} trend="Updating Live" />
              <StatCard icon={<Wallet className="text-green-400" />} label="Wallet Balance" value={`₹${stats.balance}`} trend="Secure Escrow" />
              <StatCard icon={<Bot className="text-purple-400" />} label="Engine Health" value={stats.agents} trend="45ms Latency" />
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ActionCard title="Agent Performance" desc="Check sentiment analysis and successful conversion metrics for your last 100 calls." icon={<BarChart3 />} />
              <ActionCard title="Security Protocols" desc="Enterprise-grade encryption for all voice data and PII redaction." icon={<ShieldCheck />} />
            </div>
          </div>
        ) : (
          /* 3. Agent Studio UI Section */
          <div className="animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div>
                <h2 className="text-5xl font-black italic tracking-tighter mb-2">STUDIO<span className="text-blue-500">_V1</span></h2>
                <p className="text-gray-500 font-medium">Fine-tune your AI agent's personality and regional nuances.</p>
              </div>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl font-black text-sm uppercase transition-all">
                <Plus size={18} /> Add Personality
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass p-10 hover:border-blue-500/30 transition-all group">
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform"><Mic2 /></div>
                   <h4 className="text-2xl font-bold italic">Agent Ananya (Hindi)</h4>
                </div>
                <p className="text-gray-400 leading-relaxed mb-8">Specialized in sales and customer service with a natural North Indian accent. Supports Hinglish fluently.</p>
                <button className="w-full py-4 bg-white/5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"><Play size={16} fill="currentColor"/> Preview Voice</button>
              </div>
              
              <div className="glass p-10 hover:border-purple-500/30 transition-all group">
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:scale-110 transition-transform"><Bot /></div>
                   <h4 className="text-2xl font-bold italic">Agent Vikram (Global)</h4>
                </div>
                <p className="text-gray-400 leading-relaxed mb-8">Formal international tone for business B2B inquiries and technical support calls.</p>
                <button className="w-full py-4 bg-white/5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-600 transition-all"><Play size={16} fill="currentColor"/> Preview Voice</button>
              </div>
            </div>
          </div>
        )}

        {/* 4. Real-Time Dialer Modal */}
        {showDialer && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <div className="glass max-w-sm w-full p-10 border-blue-500/30 animate-in zoom-in-95 duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              
              <div className="flex justify-between items-center mb-10">
                <div className="text-[10px] font-black tracking-[4px] text-gray-500 uppercase">Secure Link</div>
                <button onClick={() => {setShowDialer(false); setIsCalling(false);}} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
              </div>

              {!isCalling ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-black italic mb-2 tracking-tighter">DIAL_PAD</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Enter Target Number</p>
                  </div>
                  <input 
                    type="tel" 
                    placeholder="+91 XXXXX XXXXX" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 text-3xl font-mono text-center focus:border-blue-500 transition-all outline-none placeholder:opacity-20 shadow-inner"
                  />
                  <button 
                    onClick={handleMakeCall}
                    className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl shadow-blue-600/30"
                  >
                    <PhoneCall size={24} fill="white" /> Launch AI Call
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center space-y-10">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
                    <div className="w-28 h-28 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto border-2 border-blue-500 relative z-10">
                      <PhoneCall size={44} className="text-blue-500 animate-bounce" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black tracking-tighter">CONNECTING...</h4>
                    <p className="text-blue-400 font-mono text-lg tracking-[0.2em]">{phoneNumber}</p>
                  </div>
                  <button 
                    onClick={() => setIsCalling(false)}
                    className="w-full bg-red-600/10 text-red-500 border border-red-500/20 py-5 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-xl"
                  >
                    <PhoneOff size={22} /> Terminate
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-24 border-t border-white/5 py-16 text-center">
        <div className="max-w-xs mx-auto opacity-30 group cursor-default">
           <p className="text-[10px] font-black tracking-[5px] uppercase leading-relaxed group-hover:text-blue-500 transition-colors">
            Propulsion by <span className="text-white">Visora AI Labs</span>
           </p>
           <p className="text-[9px] mt-2 font-bold text-gray-600">BHARAT FIRST • SCALE INFRA • 2026</p>
        </div>
      </footer>
    </main>
  );
}

// Sub-Components
function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="glass p-10 group hover:bg-white/5 transition-all duration-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[60px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-all duration-500 border border-white/5">
          {icon}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-black tracking-[2px] text-blue-500 uppercase bg-blue-500/10 px-2 py-1 rounded-lg">Realtime</span>
        </div>
      </div>
      <div className="text-gray-500 text-[10px] font-black uppercase tracking-[3px] mb-3">{label}</div>
      <div className="text-5xl font-mono font-medium mb-6 group-hover:text-blue-400 transition-colors">{value}</div>
      <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 tracking-wider">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
        {trend}
      </div>
    </div>
  );
}

function ActionCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="glass p-10 group cursor-pointer hover:bg-white/5 transition-all border-white/5">
      <div className="flex justify-between items-start mb-8">
        <div className="p-5 bg-white/5 rounded-2xl text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all">
          {icon}
        </div>
        <ChevronRight className="text-gray-700 group-hover:text-white group-hover:translate-x-2 transition-all" />
      </div>
      <h3 className="text-2xl font-bold mb-3 italic tracking-tight">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}
