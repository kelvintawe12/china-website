import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon, ChevronDownIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'Home',
    href: '/'
  }, {
    name: 'About',
    href: '/about'
  }, {
    name: 'Experience',
    href: '/experience'
  }, {
    name: 'Projects',
    href: '/projects'
  }, {
    name: 'Gallery',
    href: '/gallery'
  }, {
    name: 'Blog',
    href: '/blog'
  }, {
    name: 'Contact',
    href: '/contact'
  }];
  const handleNavClick = (href: string) => {
    setIsOpen(false);
  };
  return <motion.nav className={`fixed w-full z-50 px-4 py-3 transition-all duration-300 
        ${scrolled ? 'bg-[#1F2A44]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}
        ${isOpen ? 'bg-[#1F2A44]' : ''}`} initial="hidden" animate="visible">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-white hover:text-[#FF6F61] transition-colors z-50" onClick={() => handleNavClick('/')}>
          VC
        </Link>
        <motion.div className="hidden lg:flex space-x-8">
          {navLinks.map(link => <Link key={link.name} to={link.href} className={`relative text-white transition-colors group
                ${location.pathname === link.href ? 'text-[#FF6F61]' : 'hover:text-[#FF6F61]'}`} onClick={() => handleNavClick(link.href)}>
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6F61] transform origin-left transition-transform duration-300
                ${location.pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>)}
        </motion.div>
        <motion.button className="lg:hidden text-white z-50" onClick={() => setIsOpen(!isOpen)} whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }}>
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && <motion.div className="fixed inset-0 bg-[#1F2A44] lg:hidden pt-20" initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} transition={{
        duration: 0.2
      }}>
            <div className="flex flex-col p-4 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navLinks.map((link, index) => <motion.a key={link.name} href={link.href} className={`text-lg py-3 px-4 rounded-lg transition-colors
                    ${activeSection === link.href.substring(1) ? 'bg-[#FF6F61] text-white' : 'text-white hover:bg-[#FF6F61]/20'}`} onClick={e => {
            e.preventDefault();
            handleNavClick(link.href);
          }} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0,
            transition: {
              delay: index * 0.1
            }
          }}>
                  {link.name}
                </motion.a>)}
            </div>
          </motion.div>}
      </AnimatePresence>
      {scrolled && <motion.div className="absolute bottom-0 left-0 h-0.5 bg-[#FF6F61]" initial={{
      width: '0%'
    }} animate={{
      width: `${window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100}%`
    }} transition={{
      duration: 0.1
    }} />}
    </motion.nav>;
};
export default Navigation;