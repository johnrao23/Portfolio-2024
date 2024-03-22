import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from './components/ThemeToggle';
import Layout from './components/Layout';
import Main from './components/Main';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import "./prism.css"

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;