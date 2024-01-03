import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Main from './3d/Main';
import WEBGL from './3d/components/WebGL';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const pathname = window.location.pathname;

if (pathname.startsWith('/static') || !WEBGL.isWebGLAvailable()) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  );
}