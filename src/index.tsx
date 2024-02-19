import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './static/App';
import ThreeContainer from './3d/ThreeContainer';
import WEBGL from './3d/components/WebGL';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const pathname = window.location.pathname;

root.render(
  <React.StrictMode>
    <Router>
      {pathname.startsWith('/static') || !WEBGL.isWebGLAvailable() ? <App /> : <ThreeContainer />}
    </Router>
  </React.StrictMode>
);
