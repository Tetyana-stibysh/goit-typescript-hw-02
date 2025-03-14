import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        removeDelay: 1000,
        style: {
          background: '#c8c0c0',
          color: '#cb2323',
          fontWeight: ' 600',
        },
      }}
    />
  </React.StrictMode>
);
