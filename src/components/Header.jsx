import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <header className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center z-20">
      <div 
        onClick={() => navigate('/')} 
        className="flex items-center space-x-3 cursor-pointer group"
      >
        <div className="p-2.5 bg-blue-600 group-hover:bg-blue-700 transition-colors rounded-xl text-white shadow-md shadow-blue-500/20">
          <Activity className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className={`text-2xl font-extrabold tracking-tight ${isLoginPage ? 'text-white' : 'text-slate-900'}`}>
            MEDICTIME
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-500 -mt-1">
            Clinical System
          </span>
        </div>
      </div>

      {!isLoginPage && (
        <button 
          onClick={() => navigate('/login')}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
        >
          Acceso Administrador &rarr;
        </button>
      )}
    </header>
  );
}