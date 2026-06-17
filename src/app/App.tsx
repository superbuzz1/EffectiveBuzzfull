import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import LoginPage from './components/LoginPage';
import SetupWizard from './components/SetupWizard';
import { Layout } from '../shared/Layout';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [hasVerifiedDomain, setHasVerifiedDomain] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDomains = async (token: string) => {
    try {
      const res = await fetch('/api/v2/dns/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const verified = data.domains.some((d: any) => d.status === 'verified');
        setHasVerifiedDomain(verified);
      }
    } catch (err) {
      console.error("Failed to fetch domains:", err);
    }
  };

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // In a real app, we would verify the token with the backend
        // and fetch the current user/tenant.
        // For now, we'll try to refresh the token to see if the session is still valid.
        const res = await fetch('/api/v2/auth/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
          // Cookie will be sent automatically
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setSelectedTenant({
            id: data.user.tenantId,
            name: "Default Tenant", // In real app, fetch tenant details
            plan: "Growth"
          });
          setIsAuthenticated(true);
          await fetchDomains(token);
        } else {
          localStorage.removeItem('accessToken');
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = async (data: any) => {
    setUser(data.user);
    setSelectedTenant({
      id: data.user.tenantId,
      name: data.tenantCreated ? data.tenantName : "Your Company",
      plan: "Growth"
    });
    setIsAuthenticated(true);
    await fetchDomains(data.accessToken);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/v2/auth/logout', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
      setSelectedTenant(null);
      setIsAuthenticated(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070b13] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </Layout>
    );
  }

  if (!hasVerifiedDomain) {
    return (
      <Layout>
        <SetupWizard />
      </Layout>
    );
  }

  return (
    <Layout>
      <Dashboard 
        currentTenant={selectedTenant}
        rbacRole={user?.role || 'Member'}
      />
      {/* Logout button could be added to a profile menu in Dashboard later */}
      <div className="fixed bottom-4 right-4">
        <button 
          onClick={handleLogout}
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs font-medium text-gray-400 hover:text-white rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    </Layout>
  );
}
