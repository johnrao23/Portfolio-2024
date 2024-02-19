import React from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/Main';
import "../index-static.css"

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/static" element={<Main />} />
    </Routes>
  );
};

export default App;
