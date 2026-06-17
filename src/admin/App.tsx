import React, { useState } from 'react';
import AdminConsole from '../components/AdminConsole';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'Owner' | 'Admin' | 'Member' | 'Agent'>('Admin');
  const [tenantsVersion, setTenantsVersion] = useState<number>(0);

  return (
    <AdminConsole 
      currentRole={currentRole}
      onChangeRole={(role) => setCurrentRole(role)}
      onTenantAdded={() => setTenantsVersion(prev => prev + 1)}
    />
  );
}
