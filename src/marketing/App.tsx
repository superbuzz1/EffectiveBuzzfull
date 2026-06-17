import React from 'react';
import MarketingPage from '../components/MarketingPage';

export default function App() {
  return (
    <MarketingPage 
      onStartApp={() => window.location.href = '/app.html'} 
    />
  );
}
