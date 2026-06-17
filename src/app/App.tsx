import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'Owner' | 'Admin' | 'Member' | 'Agent'>('Admin');
  const [selectedTenant, setSelectedTenant] = useState({
    id: "tenant-1",
    name: "Acme Corp",
    plan: "Professional"
  });

  return (
    <Dashboard 
      currentTenant={selectedTenant}
      rbacRole={currentRole}
    />
  );
}
