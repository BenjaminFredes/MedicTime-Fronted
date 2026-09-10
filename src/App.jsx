import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance, loginRequest } from './auth/msalConfig';
import AppRouter from './routes/AppRouter';

export default function App() {
  const [isProcessingAuth, setIsProcessingAuth] = useState(true);

  useEffect(() => {
    const handleGlobalRedirect = async () => {
      try {
        await msalInstance.initialize();
        const response = await msalInstance.handleRedirectPromise();

        if (response && response.account) {
          msalInstance.setActiveAccount(response.account);

          const tokenResult = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: response.account
          });

          if (tokenResult?.accessToken) {
            const userData = encodeURIComponent(JSON.stringify({
              name: response.account.name,
              username: response.account.username
            }));

            // Redirección inmediata al Dashboard de Administración
            window.location.href = `https://benjaminfredes.github.io/MedicTime-Fronted-Administrador-/?token=${encodeURIComponent(tokenResult.accessToken)}&user=${userData}`;
            return;
          }
        }
      } catch (error) {
        console.error('❌ Error procesando respuesta de MSAL:', error);
      } finally {
        setIsProcessingAuth(false);
      }
    };

    handleGlobalRedirect();
  }, []);

  if (isProcessingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-sans">
        <p className="animate-pulse">Autenticando y conectando con el sistema...</p>
      </div>
    );
  }

  return (
    <MsalProvider instance={msalInstance}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </MsalProvider>
  );
}