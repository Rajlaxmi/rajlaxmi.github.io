import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import BlogPost from './pages/BlogPost';
import InfluencesPage from './pages/Influences';
import ScrollToTop from './components/ScrollToTop';

// Component to handle PDF redirect
const ResumeRedirect = () => {
  React.useEffect(() => {
    // Redirect to the PDF file
    window.location.href = '/Rajlaxmi2Page.pdf';
  }, []);
  
  return <div>Redirecting to resume...</div>;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/influences" element={<InfluencesPage />} />
        <Route path="/resume" element={<ResumeRedirect />} />
      </Routes>
    </>
  );
}

export default App;