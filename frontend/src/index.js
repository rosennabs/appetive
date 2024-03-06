import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppDataProvider } from "./contexts/AppDataContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppDataProvider>
    <App />
  </AppDataProvider>
);
