import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import "../index-static.css"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/static" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
