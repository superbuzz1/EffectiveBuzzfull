import React, { useState } from 'react';
import { TrendingUp, DollarSign, Activity, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PipelineForecastingDashboard() {
  const [pipelineData] = useState([
    { month: 'Jul', actual: 42000, forecast: 45000, bestCase: 55000 },
    { month: 'Aug', actual: 51000, forecast: 55000, bestCase: 65000 },
    { month: 'Sep', actual: 65000, forecast: 68000, bestCase: 80000 },
    { month: 'Oct', actual: 0, forecast: 85000, bestCase: 100000 },
    { month: 'Nov', actual: 0, forecast: 110000, bestCase: 130000 },
    { month: 'Dec', actual: 0, forecast: 140000, bestCase: 170000 },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          Pipeline Forecasting Intelligence
        </h2>
        <p className="text-gray-400 text-sm mt-1">AI-driven CRM pipeline prediction and revenue forecasts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#182235] border border-gray-800 rounded-xl p-5">
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" /> Current Pipeline
          </div>
          <div className="text-3xl font-bold text-white">$240,000</div>
          <div className="text-xs text-emerald-400 mt-2">Open Deals: 42</div>
        </div>
        <div className="bg-[#182235] border border-gray-800 rounded-xl p-5">
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" /> AI Forecast (Q4)
          </div>
          <div className="text-3xl font-bold text-white">$335,000</div>
          <div className="text-xs text-indigo-400 mt-2">Confidence: 87%</div>
        </div>
        <div className="bg-[#182235] border border-gray-800 rounded-xl p-5">
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Win Rate
          </div>
          <div className="text-3xl font-bold text-white">28.4%</div>
          <div className="text-xs text-blue-400 mt-2">↑ 2.1% from last month</div>
        </div>
        <div className="bg-[#182235] border border-gray-800 rounded-xl p-5">
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" /> Avg Deal Size
          </div>
          <div className="text-3xl font-bold text-white">$5,700</div>
          <div className="text-xs text-purple-400 mt-2">Optimized by Pricing Model</div>
        </div>
      </div>

      <div className="bg-[#182235] border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Revenue Trajectory Forecast</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="month" stroke="#4b5563" tick={{fill: '#9ca3af', fontSize: 12}} />
              <YAxis stroke="#4b5563" tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="actual" name="Actual Closed Won" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
              <Line type="monotone" dataKey="forecast" name="AI Forecast" stroke="#6366f1" strokeWidth={3} strokeDasharray="5 5" dot={{r: 4}} />
              <Line type="monotone" dataKey="bestCase" name="Best Case Scenario" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="3 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
