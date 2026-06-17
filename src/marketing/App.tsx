import React from 'react';
import MarketingPage from '../components/MarketingPage';
import { Layout } from '../shared/Layout';

export default function App() {
  return (
    <Layout>
      <MarketingPage 
        onStartApp={() => window.location.href = '/app.html'} 
      />
    </Layout>
  );
}
