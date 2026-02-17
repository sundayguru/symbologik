import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Symbologik from './Symbologik';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Symbologik creator={true} />
  </StrictMode>
);
