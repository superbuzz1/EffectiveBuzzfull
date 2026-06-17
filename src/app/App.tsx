import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import { Layout } from '../shared/Layout';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'Owner' | 'Admin' | 'Member' | 'Agent'>('Admin');
  const [selectedTenant, setSelectedTenant] = useState({
    id: "tenant-1",
    name: "Acme Corp",
    plan: "Professional"
  });

  return (
    <Layout>
      <Dashboard 
        currentTenant={selectedTenant}
        rbacRole={currentRole}
      />
    </Layout>
  );
}
