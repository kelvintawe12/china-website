import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import GalleryPage from './pages/GalleryPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import BookFreeMeetingPage from './pages/BookFreeMeetingPage';
import GetLifeInsuranceQuotePage from './pages/GetLifeInsuranceQuotePage';
import ProtectYourBusinessPage from './pages/ProtectYourBusinessPage';
import ContactPage from './pages/ContactPage';
const App = () => {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/book-free-meeting" element={<BookFreeMeetingPage />} />
          <Route path="/get-life-insurance-quote" element={<GetLifeInsuranceQuotePage />} />
          <Route path="/protect-your-business" element={<ProtectYourBusinessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>;
};
export default App;