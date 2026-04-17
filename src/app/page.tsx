"use client";

import { useState, useEffect } from "react";

// --- TYPES ---
interface CallLog {
  to: string;
  status: string;
  duration_sec: number;
  cost: number;
  time: string;
}

export default function VaaniDashboard() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerId, setCustomerId] = useState("mantu_admin");
  const [balance, setBalance] = useState("0.00");
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isCalling, setIsCalling] = useState(false);

  // --- CONFIG ---
  // Ensure this matches your live Render URL
  const BACKEND_URL = "https://ai-call-center-1-48xk.onrender.com";

  // --- DATA FETCHING ---
  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Wallet Balance
      const resBal = await fetch(`${BACKEND_URL}/wallet/balance/${customerId}`);
      const dataBal = await resBal.json();
      setBalance(dataBal.balance || "0.00");

      // 2. Fetch Call Logs (Stats)
      const resStats = await fetch(`${BACKEND_URL}/dashboard/stats`);
      const dataStats = await resStats.json();
      setCalls(dataStats.recent_calls || []);
    } catch (e) {
      console.error("Dashboard Sync Error:", e);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 15000); // Auto-refresh every 15s
    return () => clearInterval(interval);
  }, [customerId]);

  // --- ACTIONS ---
  const handleMakeCall = async () => {
    if (!phoneNumber) {
      setStatus({ type: "error", message: "Kripya mobile number enter karein!" });
      return;
    }

    setIsCalling(true);
    setStatus({ type: "info", message: "Vaani AI Dialing..." });

    try {
      const response = await fetch(`${BACKEND_URL}/voice/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to_phone: phoneNumber,
          customer_id: customerId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: "✅ Call lag gayi hai! AI baat kar raha hai." });
        setPhoneNumber(""); // Reset input
        setTimeout(fetchDashboardData, 5000); // 5s baad refresh stats
      } else {
        setStatus({ type: "error", message: `❌ Error: ${data.detail || "Call fail ho gayi"}` });
      }
    } catch (error) {
      setStatus({ type: "error", message: "❌ Network Error: Backend se link tut gaya." });
    } finally {
      setIsCalling(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP NAV / HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#161b2c] p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Vaani AI Dashboard
            </h1>
            <p className="text-slate-500 text-xs tracking-widest uppercase mt-1">Visora AI Labs Infrastructure</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Main Wallet</p>
              <p className="text-2xl font-mono font-bold text-green-400">₹{balance}</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 p-3 rounded-xl transition-all">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* DIALER SECTION */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#161b2c] border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="bg-blue-500 w-2 h-6 rounded-full mr-3"></span>
                Instant AI Dialer
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Customer ID</label>
                  <input 
                    type="text" 
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full bg-[#0b0f1a] border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Recipient Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-[#0b0f1a] border border-slate-700 rounded-2xl p-4 text-2xl font-mono text-center text-blue-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <button 
                  onClick={handleMakeCall}
                  disabled={isCalling}
                  className={`w-full py-5 rounded-2xl font-bold text-lg shadow-lg transform transition active:scale-95 ${
                    isCalling 
                    ? "bg-slate-700 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/20 text-white"
                  }`}
                >
                  {isCalling ? "Dialing..." : "📞 Trigger AI Call"}
                </button>
              </div>

              {status.message && (
                <div className={`p-4 rounded-xl text-xs text-center border animate-pulse ${
                  status.type === "error" ? "bg-red-900/20 border-red-800 text-red-400" : 
                  status.type === "success" ? "bg-green-900/20 border-green-800 text-green-400" : 
                  "bg-blue-900/20 border-blue-800 text-blue-400"
                }`}>
                  {status.message}
                </div>
              )}
            </div>
          </div>

          {/* CALL LOGS SECTION */}
          <div className="lg:col-span-2">
            <div className="bg-[#161b2c] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#1c2237]">
                <h3 className="font-bold text-lg text-white">Live Call Registry</h3>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">System Online</span>
                </div>
              </div>
              
              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0b0f1a] text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                      <th className="p-4">To Number</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Duration</th>
                      <th className="p-4">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {calls.length > 0 ? calls.map((call, i) => (
                      <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                        <td className="p-4 font-mono text-sm text-slate-300 group-hover:text-blue-400">{call.to}</td>
                        <td className="p-4">
                          <span className={`text-[9px] px-2 py-1 rounded-full font-bold uppercase border ${
                            call.status === 'completed' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                          }`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-slate-400">{call.duration_sec}s</td>
                        <td className="p-4 text-xs font-bold text-slate-200">₹{call.cost}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="p-20 text-center">
                          <p className="text-slate-600 text-sm">No recent activity detected.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center py-6">
          <p className="text-slate-600 text-[10px] tracking-[0.2em] uppercase font-bold">
            Visora AI Labs © 2026 | Distributed via Render Edge
          </p>
        </div>

      </div>
    </div>
  );
}
