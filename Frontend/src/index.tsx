import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Home } from './Components/home/Home/Home';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './Components/layout/Layout/Layout';
import interceptors from './utils/Interceptors';

interceptors.create()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

reportWebVitals();
