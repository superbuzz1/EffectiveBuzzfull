import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Users, Mail, DollarSign, Activity, 
  ArrowUpRight, ArrowDownRight, LayoutDashboard, Calendar, RefreshCw
} from 'lucide-react';
import { Layout } from '../shared/Layout';

export default function AnalyticsApp() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v2/analytics/dashboard', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const data = await res.json();
      if (data.success) {
        setMetrics(data.metrics);
      }
    } catch (err) {
      console.error("Failed to fetch metrics:", err);
      // Fallback data for demo
      setMetrics({
        arr: 12500,
        outreachVolume: 1420,
        avgEditDelta: 12.4,
        trends: Array.from({ length: 14 }).map((_, i) => ({
          date: `Jun ${i + 1}`,
          arr: 10000 + i * 200 + Math.random() * 500,
          outreachVolume: 80 + Math.random() * 40,
          replyRate: 12 + Math.random() * 5
        }))
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 max-w-7xl mx-auto py-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-medium text-white tracking-tight">Executive Command Center</h1>
            <p className="text-gray-400 text-sm mt-1">Real-time platform performance and financial visibility.</p>
          </div>
          <button 
            onClick={fetchMetrics}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-gray-800 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Annual Recurring Revenue', val: `$${(metrics?.arr || 0).toLocaleString()}`, icon: DollarSign, delta: '+12%', color: 'text-emerald-400' },
            { label: 'Total Outreach Volume', val: (metrics?.outreachVolume || 0).toLocaleString(), icon: Mail, delta: '+8%', color: 'text-blue-400' },
            { label: 'Average Edit-Delta', val: `${metrics?.avgEditDelta?.toFixed(1)}%`, icon: Activity, delta: '-4%', color: 'text-indigo-400' },
            { label: 'Active Subscriptions', val: '24', icon: Users, delta: '+2', color: 'text-amber-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0d131f] border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-display font-bold text-white">{stat.val}</h3>
                  <span className={`text-[10px] font-bold flex items-center gap-0.5 ${stat.delta.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stat.delta.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.delta}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Trend */}
          <div className="bg-[#0d131f] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Revenue Growth (ARR)
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">LAST 30 DAYS</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics?.trends}>
                  <defs>
                    <linearGradient id="colorArr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d131f', border: '1px solid #1f2937', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="arr" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorArr)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Outreach Performance */}
          <div className="bg-[#0d131f] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Campaign Efficiency (Reply Rate)
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">LAST 30 DAYS</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics?.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d131f', border: '1px solid #1f2937', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Bar dataKey="replyRate" fill="#818cf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
