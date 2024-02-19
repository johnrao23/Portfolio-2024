import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './static/App';
import Main from './3d/Main';
import WEBGL from './3d/components/WebGL';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const pathname = window.location.pathname;

if (pathname.startsWith('/static/*') || !WEBGL.isWebGLAvailable()) {
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <Router>
        <Main />
      </Router>
    </React.StrictMode>
  );
}
