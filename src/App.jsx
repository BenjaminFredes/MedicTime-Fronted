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

            // Redirección inmediata sin renderizar rutas intermedias
            window.location.replace(`https://benjaminfredes.github.io/MedicTime-Fronted-Administrador-/?token=${encodeURIComponent(tokenResult.accessToken)}&user=${userData}`);
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

  // Mientras valida el token, mostramos una pantalla oscura suave para evitar parpadeos de la interfaz
  if (isProcessingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center justify-center space-y-4 font-sans">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium tracking-wide">Iniciando sesión segura...</p>
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