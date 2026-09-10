import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowLeft, Shield } from 'lucide-react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/msalConfig';
import Header from '../../components/Header';

export default function Login() {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        await instance.initialize();
        const response = await instance.handleRedirectPromise();

        if (response && response.account) {
          instance.setActiveAccount(response.account);
          
          const tokenResult = await instance.acquireTokenSilent({
            ...loginRequest,
            account: response.account
          });

          if (tokenResult?.accessToken) {
            setStatusMsg('Login correcto. Redirigiendo a la plataforma administradora...');
            
            const userData = encodeURIComponent(JSON.stringify({
              name: response.account.name,
              username: response.account.username
            }));

            // Redirección al Frontend 2 en GitHub Pages
            setTimeout(() => {
              window.location.href = `https://benjaminfredes.github.io/MedicTime-Fronted-Administrador-/?token=${encodeURIComponent(tokenResult.accessToken)}&user=${userData}`;
            }, 1000);
          }
        }
      } catch (error) {
        console.error('❌ Error en redirección MSAL:', error);
        setStatusMsg(`Error: ${error?.message || 'Error de autenticación'}`);
      }
    };

    handleAuthRedirect();
  }, [instance]);

  const handleLogin = async () => {
    try {
      setStatusMsg('Conectando con Microsoft Entra ID...');
      await instance.initialize();
      
      // Forzamos la selección de cuenta y especificamos la ruta de retorno exacta
      await instance.loginRedirect({
        ...loginRequest,
        prompt: 'select_account',
        redirectStartPage: `${window.location.origin}/MedicTime-Fronted/#/login`
      });
    } catch (error) {
      console.error('ERROR AL INICIAR SESIÓN:', error);
      setStatusMsg(`Error: ${error?.message || 'Error desconocido'}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>

      <Header />

      <main className="max-w-md w-full mx-auto my-auto py-8 z-10">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 border border-blue-800/50 px-3 py-1 rounded-full">
            Panel de Administración
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Acceso a la plataforma</h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
            Gestiona los recursos de tu clínica de forma simple, segura y centralizada.
          </p>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shadow-inner">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-white">Acceso administrativo</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              El acceso a este módulo utiliza autenticación segura institucional.
            </p>
          </div>

          {statusMsg && (
            <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-700/50 text-blue-300 text-xs font-mono animate-pulse">
              {statusMsg}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full inline-flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Lock className="w-5 h-5" />
            <span className="tracking-wide">INICIAR SESIÓN</span>
          </button>

          <div className="pt-4 border-t border-slate-700/60">
            <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>
                Autenticación segura mediante <strong className="text-slate-200 font-semibold">Microsoft Entra ID</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la página principal</span>
          </button>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-500 z-10 py-4">
        MEDICTIME &bull; Sistema Hospitalario Centralizado
      </footer>
    </div>
  );
}