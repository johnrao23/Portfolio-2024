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
    <div className = "flex h-full bg-zinc-50 dark:bg-black">
      <ThemeProvider>
        <div className="flex w-full">
          <Layout>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
            </Routes>
          </Layout>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;