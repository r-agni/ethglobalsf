// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import GetStarted from './pages/Getstarted';
import LearnMore from './pages/Learnmore';

import './tailwind.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/getstarted" element={<GetStarted />} />
      <Route path="/learnmore" element={<LearnMore />} />
    </Routes>
  </Router>
);

export default App;
