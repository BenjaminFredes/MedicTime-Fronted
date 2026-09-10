import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Building2, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '../../components/Header';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      title: "Gestión de médicos",
      description: "Organiza el personal médico, turnos y credenciales de forma eficiente."
    },
    {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      title: "Administración centralizada",
      description: "Control total de la información clínica en una sola pantalla unificada."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Procesos más rápidos",
      description: "Automatización de flujos operativos y reducción de tiempos muertos."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Plataforma segura y Cloud",
      description: "Infraestructura lista para escalar bajo los más altos estándares sanitarios."
    }
  ];

  const benefits = [
    "Plataforma optimizada para administradores clínicos",
    "Preparado para integración segura con Microsoft Entra ID",
    "Diseño adaptable para laptops, tablets y móviles"
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Header />

      {/* Hero Section */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Información Principal */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Gestión Clínica Inteligente</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Tecnología que facilita la <span className="text-blue-600">gestión clínica.</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Como administrador, podrás gestionar y mantener organizada la información de los profesionales de la clínica, facilitando y automatizando los procesos administrativos.
            </p>

            <div className="space-y-2 pt-2">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center space-x-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Ingresar al sistema</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Visual Ilustrativa */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200/80 p-3">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80" 
                alt="Panel de Tecnología en Salud Digital MEDICTIME" 
                className="w-full h-[380px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent rounded-3xl"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/10">
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">MEDICTIME Suite</p>
                <p className="text-sm font-medium mt-0.5">Control y administración clínica en tiempo real.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Características del Sistema */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="p-3 bg-blue-50 w-fit rounded-xl mb-4">
                {feat.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} MEDICTIME. Plataforma de gestión clínica para administradores.
        </div>
      </footer>
    </div>
  );
}
