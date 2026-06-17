import React, { useState } from 'react';
import AdminConsole from '../components/AdminConsole';
import { Layout } from '../shared/Layout';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'Owner' | 'Admin' | 'Member' | 'Agent'>('Admin');
  const [tenantsVersion, setTenantsVersion] = useState<number>(0);

  return (
    <Layout>
      <AdminConsole 
        currentRole={currentRole}
        onChangeRole={(role) => setCurrentRole(role)}
        onTenantAdded={() => setTenantsVersion(prev => prev + 1)}
      />
    </Layout>
  );
}
