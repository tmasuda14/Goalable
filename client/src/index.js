import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthContextProvider } from './context/AuthContext'
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';
// Custom CSS
import './index.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

