import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AGENT_CONFIG } from './config';
import './index.css';

document.documentElement.style.setProperty('--primary', AGENT_CONFIG.primaryColor);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
