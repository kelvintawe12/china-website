import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ParticleBackground from '../ui/ParticleBackground';
import ChatBubble from '../chat/ChatBubble';
const Layout = () => {
  return <div className="bg-[#1F2A44] text-white min-h-screen font-sans">
      <ParticleBackground />
      <Navigation />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <ChatBubble />
    </div>;
};
export default Layout;