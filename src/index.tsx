import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './static/App';
import ThreeContainer from './3d/ThreeContainer';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const AppRouter = () => (
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/static/*" element={<App />} />
        <Route path="*" element={<ThreeContainer />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

root.render(<AppRouter />);
