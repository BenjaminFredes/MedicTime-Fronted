import React from 'react';
import { HashRouter } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './auth/msalConfig';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </MsalProvider>
  );
}