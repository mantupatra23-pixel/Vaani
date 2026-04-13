"use client";
import React, { useState, useEffect } from 'react';
import { 
  Activity, Wallet, Bot, ChevronRight, PhoneCall, 
  Settings, Mic2, Play, Plus, Zap, BarChart3, ShieldCheck, X, PhoneOff, Signal, Clock
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDialer, setShowDialer] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [stats, setStats] = useState({ calls: 0, balance: 1450.50, agents: 'Active' });

  // 1. Backend Sync Logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulation: Agar call active hai toh dashboard update hoga
      if (isCalling) {
        setStats(prev => ({ ...prev, calls: 1 }));
      } else {
        setStats(prev => ({ ...prev, calls: 0 }));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isCalling]);

  // 2. Twilio Start Call Function (Backend: /call/start)
  const handleMakeCall = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      return alert("Bhai, sahi mobile number dalo (e.g. +91XXXXXXXXXX)");
    }
    
    setIsCalling(true);
    try {
      const response = await fetch('https://ai-call-center-1-48xk.onrender.com/call/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          customer_id: "mantu_admin", 
          to_phone: phoneNumber 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Backend Error: ${data.detail || 'Call Request Failed'}`);
        setIsCalling(false);
      } else {
        console.log("Call successfully queued on Twilio:", data);
      }
      
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Backend se signal nahi mil raha. Check if Render server is awake.");
      setIsCalling(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[140px] rounded-full opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center mb-16 glass px-6 py-4 border-white/5 shadow-2xl sticky top-4 z-[50]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <PhoneCall size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter italic leading-none">VAANI<span className="text-blue-500">AI</span></span>
              <span className="text-[9px] uppercase tracking-[3px] text-gray-500 font-bold tracking-widest">Visora Suite</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <button onClick={() => setActiveTab('overview')} className={`hover:text-white transition-all ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-500 pb-1' : ''}`}>Overview</button>
              <button onClick={() => setActiveTab('studio')} className={`hover:text-white transition-all ${activeTab === 'studio' ? 'text-blue-400 border-b-2 border-blue-500 pb-1' : ''}`}>Agent Studio</button>
            </div>
            <button onClick={() => setShowDialer(true)} className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all flex items-center gap-2 shadow-xl shadow-blue-600/30">
              <Zap size={14} fill="white" /> New Call
            </button>
          </div>
        </nav>

        {activeTab === 'overview' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Hero Header */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-[10px] font-black mb-6 tracking-[3px] uppercase">
                <Signal size={12} className="animate-pulse" /> Bharat's AI Infrastructure v4
              </div>
              <h1 className="text-7xl md:text-[100px] font-black tracking-tighter mb-6 leading-[0.85]">
                Human-Grade <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent italic">Voice Logic.</span>
              </h1>
              <p className="text-gray-500 max-w-2xl text-xl font-medium leading-relaxed">
                Connect your Twilio keys and start making autonomous regional calls with <span className="text-white">45ms latency</span>.
              </p>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <StatCard icon={<Activity className="text-blue-400" />} label="Live Sessions" value={stats.calls.toString()} trend="Updating..." />
              <StatCard icon={<Wallet className="text-green-400" />} label="Wallet Credits" value={`₹${stats.balance}`} trend="Secure" />
              <StatCard icon={<Bot className="text-purple-400" />} label="Engine Health" value={stats.agents} trend="All Systems GO" />
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ActionCard title="Agent Intelligence" desc="Access deep sentiment analysis and conversion logs for Bharat-first dialects." icon={<BarChart3 />} />
              <ActionCard title="Automated Billing" desc="Usage-based billing with real-time wallet deduction and secure UPI refill." icon={<ShieldCheck />} />
            </div>
          </div>
        ) : (
          /* Agent Studio Section */
          <div className="animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-between items-end mb-12">
               <div>
                 <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Studio<span className="text-blue-500">_V4</span></h2>
                 <p className="text-gray-500 font-medium">Fine-tune voice pitch, instructions, and regional accents.</p>
               </div>
               <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-black text-xs uppercase flex items-center gap-2 hover:bg-white/10 transition-all">
                  <Plus size={16} /> New Personality
               </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="glass p-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                    <Mic2 size={16} className="text-blue-500" /> Core Voice Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Agent Name (e.g. Ananya)" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none font-bold" />
                    <select className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold">
                      <option>Hindi (Female) - Natural</option>
                      <option>Bengali (Female) - Professional</option>
                      <option>English (Male) - Corporate</option>
                    </select>
                  </div>
                </div>
                <div className="glass p-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                    <Settings size={16} className="text-purple-500" /> System Instruction Prompt
                  </h3>
                  <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-all font-medium" placeholder="Ex: You are a friendly sales assistant for Visora AI..."></textarea>
                </div>
              </div>
              
              <div className="glass p-8 border-blue-500/20 bg-blue-500/5 text-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-8">Quick Preview</h3>
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/40 hover:scale-110 transition-transform cursor-pointer">
                   <Play fill="white" className="ml-1" />
                </div>
                <p className="text-center text-xs font-bold text-gray-500 italic mb-8">"Namaste, main Vaani AI hoon. Kaise madad karu?"</p>
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Global Dialer Modal (Twilio Integrated) */}
        {showDialer && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-4">
            <div className="glass max-w-sm w-full p-10 border-blue-500/30 animate-in zoom-in-95 duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              
              <div className="flex justify-between items-center mb-10">
                <div className="text-[9px] font-black tracking-[4px] text-gray-500 uppercase">Visora Secure Dialer</div>
                <button onClick={() => {setShowDialer(false); setIsCalling(false);}} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
              </div>

              {!isCalling ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-black italic mb-1 tracking-tighter">DIAL_PAD</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Input Destination Number</p>
                  </div>
                  <input 
                    type="tel" 
                    placeholder="+91..." 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 text-3xl font-mono text-center focus:border-blue-500 transition-all outline-none shadow-inner"
                  />
                  <button 
                    onClick={handleMakeCall}
                    className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl shadow-blue-600/30"
                  >
                    <PhoneCall size={24} fill="white" /> Initiate AI Call
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center space-y-10">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
                    <div className="w-28 h-28 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto border-2 border-blue-500 relative z-10 animate-bounce">
                      <PhoneCall size={44} className="text-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black tracking-tighter italic">DIALING...</h4>
                    <p className="text-blue-400 font-mono text-lg tracking-[0.2em]">{phoneNumber}</p>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-600">
                    <Clock size={14} /> Est. Latency: 45ms
                  </div>
                  <button 
                    onClick={() => setIsCalling(false)}
                    className="w-full bg-red-600/10 text-red-500 border border-red-500/20 py-5 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-xl"
                  >
                    <PhoneOff size={22} /> Abort Session
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
           <p className="text-[8px] mt-2 font-bold text-gray-600 tracking-widest uppercase italic">Bharat 2026 • AI-First Infrastructure</p>
        </div>
      </footer>
    </main>
  );
}

// Reusable Components
function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="glass p-10 group hover:bg-white/5 transition-all duration-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[60px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-all duration-500 border border-white/5">
          {icon}
        </div>
        <span className="text-[8px] font-black tracking-[2px] text-blue-500 uppercase bg-blue-500/10 px-2 py-1 rounded-lg">Realtime</span>
      </div>
      <div className="text-gray-500 text-[10px] font-black uppercase tracking-[3px] mb-3">{label}</div>
      <div className="text-6xl font-mono font-medium mb-6 group-hover:text-blue-400 transition-colors">{value}</div>
      <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 tracking-wider">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
        {trend}
      </div>
    </div>
  );
}

function ActionCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="glass p-12 group cursor-pointer hover:bg-white/5 transition-all border-white/5">
      <div className="flex justify-between items-start mb-10">
        <div className="p-5 bg-white/5 rounded-2xl text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all border border-white/5 shadow-2xl">
          {icon}
        </div>
        <ChevronRight className="text-gray-700 group-hover:text-white group-hover:translate-x-2 transition-all" />
      </div>
      <h3 className="text-3xl font-black mb-4 italic tracking-tighter uppercase">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-lg font-medium">{desc}</p>
    </div>
  );
}
