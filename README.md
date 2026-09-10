# MEDICTIME — Plataforma de Gestión Clínica (MVP Frontend)

Este repositorio contiene la interfaz inicial completa del proyecto **MEDICTIME**, optimizada para el rol de Administrador.

## 🚀 Instrucciones para ejecutar el proyecto

1. Extrae el archivo ZIP en tu equipo.
2. Abre tu terminal e ingresa a la carpeta del proyecto:
   ```bash
   cd medictime-frontend
   ```
3. Instala todas las dependencias necesarias:
   ```bash
   npm install
   ```
4. Inicia el servidor local de desarrollo:
   ```bash
   npm run dev
   ```
5. El navegador se abrirá automáticamente en `http://localhost:3000` (o la dirección indicada en consola).

---

## 🛠️ Estructura del Proyecto

```
medictime-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/          <- Recursos gráficos y estilos globales
│   ├── auth/            <- Configuración e integración MSAL / Microsoft Entra ID
│   ├── components/      <- Componentes reutilizables (Navbar, Cards, UI)
│   ├── pages/
│   │   ├── Home/        <- Landing page / bienvenida de MEDICTIME
│   │   └── Login/       <- Panel de acceso del Administrador (Entra ID ready)
│   ├── routes/          <- Definición de rutas con React Router
│   ├── App.jsx          <- Proveedor de autenticación (MsalProvider) y enrutador
│   ├── index.css        <- Tailwind CSS / Estilos base
│   └── main.jsx         <- Punto de montaje de React
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔐 Integración Futura con Microsoft Entra ID (MSAL)

Para conectar posteriormente con Microsoft Entra ID, solo debes ir al archivo `src/auth/msalConfig.js` y completar las credenciales provistas por Azure:

```javascript
export const msalConfig = {
  auth: {
    clientId: "TU_CLIENT_ID_AQUI",
    authority: "https://login.microsoftonline.com/TU_TENANT_ID_AQUI",
    redirectUri: window.location.origin + "/login",
  }
};
```
