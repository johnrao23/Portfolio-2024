import React from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/Main';
import "../index-static.css"
import About from './components/About';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
