import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap added here
import 'bootstrap-icons/font/bootstrap-icons.css'; // ✅ Bootstrap Icons

import { UserProvider } from './context/UserContext'; // ✅ Import UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* ✅ Wrap App with UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
