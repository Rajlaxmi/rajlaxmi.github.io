import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import BlogPost from './pages/BlogPost';
import InfluencesPage from './pages/Influences';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/influences" element={<InfluencesPage />} />
      </Routes>
    </>
  );
}

export default App;