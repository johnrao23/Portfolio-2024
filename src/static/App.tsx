import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from './components/ThemeToggle';
import Layout from './components/Layout';
import Main from './components/Main';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Hobbies from './components/Hobbies';
import NotFound from './components/404';
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
              <Route path="/skills" element={<Skills />} />
              <Route path="/hobbies" element={<Hobbies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;