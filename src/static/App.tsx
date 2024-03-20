import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from './components/ThemeToggle';
import Main from './components/Main';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';

const App: React.FC = () => {
  return (
    <ThemeProvider>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/experience" element={<Experience />} />
    </Routes>
  );
};

export default App;