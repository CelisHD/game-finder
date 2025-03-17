import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="game/:id" element={<GameDetail />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
