import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GlobalStyle } from '@styles/globalStyle';
import { LocationProvider } from '@provider/PresentLocation';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@api/instance';
import { AuthProvider } from '@provider/AuthProvider';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
