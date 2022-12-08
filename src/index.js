import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import { AuthProviderWrapper } from './context/auth.context';
import { ProceduresProviderWrapper } from './context/procedures.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProviderWrapper>
      <ProceduresProviderWrapper>
        <App />
      </ProceduresProviderWrapper>
    </AuthProviderWrapper>
  </Router>
);
