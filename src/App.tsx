// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Getstarted from './pages/Getstarted';

import './tailwind.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getstarted" element={<Getstarted />} />
    </Routes>
  </Router>
);

export default App;
