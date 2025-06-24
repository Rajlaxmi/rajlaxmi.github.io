import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}

export default App;