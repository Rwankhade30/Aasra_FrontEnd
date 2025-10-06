import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap added here
import 'bootstrap-icons/font/bootstrap-icons.css'; // ✅ Bootstrap Icons
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <-- includes Popper

import { UserProvider } from './context/UserContext'; // ✅ Import UserProvider
import { AuthProvider } from './context/AuthContext'; // ✅ Import UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap App with AuthProvider */}
     <UserProvider> {/* ✅ Wrap App with UserProvider */}
        <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
