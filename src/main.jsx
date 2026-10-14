import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Tipografías del club: se cargan desde node_modules, sin servicios externos
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource-variable/inter';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
