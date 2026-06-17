import React, { useState, useEffect } from 'react';
import { Database, Link, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function CRMIntegrationConsole() {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const res = await fetch('/api/v2/crm', { headers: { 'Authorization': `Bearer mock-token` } });
      const data = await res.json();
      if (data.success) setIntegrations(data.data);
    } catch (err) {}
  };

  const connect = async (provider: string) => {
    setLoading(true);
    try {
      await fetch(`/api/v2/crm/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer mock-token` },
        body: JSON.stringify({ accessToken: 'mock-access', instanceUrl: 'mock.crm.com' })
      });
      fetchIntegrations();
    } catch (err) {}
    setLoading(false);
  };

  const disconnect = async (provider: string) => {
    try {
      await fetch(`/api/v2/crm/${provider}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer mock-token` }
      });
      fetchIntegrations();
    } catch (err) {}
  };

  const sync = async (provider: string) => {
    try {
      await fetch(`/api/v2/crm/${provider}/sync`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer mock-token` }
      });
      fetchIntegrations();
    } catch (err) {}
  };

  const renderCard = (provider: string, name: string) => {
    const integration = integrations.find(i => i.provider === provider);
    const isConnected = !!integration;

    return (
      <div className="bg-[#182235] border border-gray-800 rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#0d131f] flex items-center justify-center border border-gray-800">
            <Database className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">{name}</h3>
            <p className="text-xs text-gray-500">
              {isConnected ? `Synced at ${new Date(integration.lastSyncAt).toLocaleString()}` : 'Not connected'}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {isConnected ? (
            <>
              <button onClick={() => sync(provider)} className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Sync Now
              </button>
              <button onClick={() => disconnect(provider)} className="text-red-400 hover:text-red-300 px-4 py-2 text-sm font-semibold">
                Disconnect
              </button>
            </>
          ) : (
            <button onClick={() => connect(provider)} disabled={loading} className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
              <Link className="w-4 h-4" /> Connect
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="w-6 h-6 text-indigo-400" />
          CRM Integrations
        </h2>
        <p className="text-gray-400 text-sm mt-1">Connect your CRM to sync contacts, leads, and analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard('hubspot', 'HubSpot')}
        {renderCard('salesforce', 'Salesforce')}
        {renderCard('pipedrive', 'Pipedrive')}
      </div>
    </div>
  );
}
