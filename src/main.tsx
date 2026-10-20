import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { BillingProvider } from './contexts/BillingContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BillingProvider>
        <App />
      </BillingProvider>
    </AuthProvider>
  </StrictMode>,
);
