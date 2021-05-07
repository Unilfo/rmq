import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/app/App';
import AppStateProvider from './components/provider';
import 'normalize.css';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';


ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
