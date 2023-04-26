import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './features/api/apiSlice';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApiProvider api={apiSlice}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiProvider>
);