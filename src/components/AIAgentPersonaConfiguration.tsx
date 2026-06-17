import React, { useState, useEffect } from 'react';
import { Bot, Save, Plus, Trash2, Cpu, Settings, Sliders } from 'lucide-react';

export default function AIAgentPersonaConfiguration() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', persona: '', voice: 'professional', model: 'claude-3-5-sonnet' });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v2/agents', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || 'mock-token'}` }
      });
      const data = await res.json();
      if (data.success) {
        setAgents(data.data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const isNew = editingId === 'new';
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/v2/agents' : `/api/v2/agents/${editingId}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || 'mock-token'}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setEditingId(null);
        fetchAgents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/v2/agents/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || 'mock-token'}` }
      });
      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (agent: any) => {
    setEditingId(agent.id);
    setFormData({ name: agent.name, persona: agent.persona, voice: agent.voice || 'professional', model: agent.model || 'claude-3-5-sonnet' });
  };

  const startNew = () => {
    setEditingId('new');
    setFormData({ name: 'New AI SDR', persona: 'You are an elite outbound sales representative...', voice: 'professional', model: 'claude-3-5-sonnet' });
  };

  if (loading) {
    return <div className="p-8 text-gray-400">Loading AI Personas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-400" />
            AI Persona Configuration
          </h2>
          <p className="text-gray-400 text-sm mt-1">Configure fine-tuned AI Agents to handle custom outreach and replies.</p>
        </div>
        <button 
          onClick={startNew}
          className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Persona
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3">
          {agents.map(agent => (
            <div 
              key={agent.id}
              onClick={() => startEdit(agent)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${editingId === agent.id ? 'bg-indigo-500/10 border-indigo-500 text-white' : 'bg-[#182235] border-gray-800 text-gray-300 hover:border-gray-600'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{agent.name}</span>
                <Cpu className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{agent.model} • {agent.voice}</p>
            </div>
          ))}
          {agents.length === 0 && <p className="text-sm text-gray-500">No personas configured yet.</p>}
        </div>

        <div className="md:col-span-2">
          {editingId ? (
            <div className="bg-[#182235] border border-gray-800 rounded-xl p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Agent Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0d131f] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Voice Tone</label>
                  <select
                    value={formData.voice}
                    onChange={e => setFormData({ ...formData, voice: e.target.value })}
                    className="w-full bg-[#0d131f] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="professional">Professional & Direct</option>
                    <option value="casual">Casual & Friendly</option>
                    <option value="aggressive">Aggressive Sales</option>
                    <option value="consultative">Consultative Advisor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Language Model</label>
                  <select
                    value={formData.model}
                    onChange={e => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-[#0d131f] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sliders className="w-4 h-4" /> System Prompt (Persona Context)
                </label>
                <textarea 
                  value={formData.persona}
                  onChange={e => setFormData({ ...formData, persona: e.target.value })}
                  className="w-full bg-[#0d131f] border border-gray-800 rounded-lg p-3 text-white h-48 focus:outline-none focus:border-indigo-500"
                  placeholder="You are an expert SDR representing..."
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                {editingId !== 'new' ? (
                  <button onClick={() => handleDelete(editingId)} className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-semibold">
                    <Trash2 className="w-4 h-4" /> Delete Agent
                  </button>
                ) : <div />}
                <div className="flex gap-3">
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 text-gray-400 hover:text-white text-sm font-semibold">Cancel</button>
                  <button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Configuration
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#182235]/50 border border-gray-800/50 rounded-xl p-12 flex flex-col items-center justify-center text-center h-full">
              <Settings className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-gray-400">Select an agent from the list or create a new one to edit their configuration.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
