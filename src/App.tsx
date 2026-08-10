import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import BlogPost from './pages/BlogPost';
import InfluencesPage from './pages/Influences';
import ProjectsPage from './pages/Projects';
import WritingPage from './pages/Writing';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';

/** The résumé lives in /public and is served directly, outside the SPA. */
const RESUME_PATH = '/RajlaxmiResume.pdf';

const ResumeRedirect: React.FC = () => {
  React.useEffect(() => {
    window.location.replace(RESUME_PATH);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <p className="text-muted">
        Opening the résumé…{' '}
        <a href={RESUME_PATH} className="link">
          Download it directly
        </a>
        .
      </p>
    </div>
  );
};

const NotFound: React.FC = () => (
  <div className="min-h-screen bg-paper">
    <Header />
    <main className="mx-auto flex min-h-[70vh] max-w-page items-center px-6 sm:px-10">
      <div>
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-title text-ink">Nothing here.</h1>
        <p className="mt-6">
          <Link to="/" className="link">
            Back to the beginning
          </Link>
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog" element={<Navigate to="/#blog" replace />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/influences" element={<InfluencesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/resume" element={<ResumeRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
