import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon, Linkedin, Twitter } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Gallery', href: '/gallery' },
  {
    name: 'Blog',
    href: '/blog',
    submenu: [
      { name: 'Categories', href: '/blog/categories' },
      { name: 'Latest Posts', href: '/blog/latest' },
    ],
  },
  { name: 'Contact', href: '/contact' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light') return false;
      if (saved === 'dark') return true;
      return saved ? JSON.parse(saved) : true;
    } catch (error) {
      console.error('Failed to parse theme from localStorage:', error);
      return true; // Default to dark mode
    }
  });
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  // Memoize navLinks
  const memoizedNavLinks = useMemo(() => navLinks, []);

  // Handle scroll and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setOpenSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Esc key to close mobile menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setOpenSubmenu(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Theme toggle
  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
  }, [isDarkMode]);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, []);

  const toggleSubmenu = useCallback((name: string) => {
    setOpenSubmenu((prev) => (prev === name ? null : name));
  }, []);

  return (
    <motion.nav
      ref={navRef}
      className={`fixed w-full z-50 px-4 sm:px-6 py-3 transition-all duration-300 ${
        scrolled ? 'bg-navy-900/95 backdrop-blur-md shadow-lg scale-95' : 'bg-navy-900'
      } ${isOpen ? 'bg-navy-900' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-serif font-bold text-white hover:text-coral-500 transition-colors z-50"
          onClick={() => handleNavClick('/')}
          aria-label="Viola China Home"
        >
          VC
        </Link>

        {/* Desktop Menu */}
        <motion.div className="hidden lg:flex items-center space-x-6">
          {memoizedNavLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                to={link.href}
                className={`relative text-white transition-colors ${
                  location.pathname === link.href || activeSection === link.href.substring(1)
                    ? 'text-coral-500 font-semibold'
                    : 'hover:text-coral-500'
                } flex items-center gap-1`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.name}
                {link.submenu && (
                  <ChevronDown
                    size={16}
                    className="group-hover:rotate-180 transition-transform duration-200"
                  />
                )}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-coral-500 transform origin-left transition-transform duration-300 ${
                    location.pathname === link.href || activeSection === link.href.substring(1)
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
              {/* Submenu */}
              {link.submenu && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 bg-navy-800 rounded-lg shadow-lg overflow-hidden hidden group-hover:block"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
                >
                  {link.submenu.map((subLink) => (
                    <Link
                      key={subLink.name}
                      to={subLink.href}
                      className="block px-4 py-2 text-white hover:bg-coral-500 hover:text-white transition-colors"
                      onClick={() => handleNavClick(subLink.href)}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          {/* Theme Toggle */}
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-navy-800 text-white hover:bg-coral-500"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-navy-900 lg:hidden pt-20 pb-4 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 150 }}
          >
            <div className="flex flex-col p-4 sm:p-6 space-y-2 max-h-[calc(100vh-5rem)]">
              {memoizedNavLinks.map((link, index) => (
                <div key={link.name}>
                  <motion.div
                    className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors ${
                      activeSection === link.href.substring(1)
                        ? 'bg-coral-500 text-white'
                        : 'text-white hover:bg-coral-500/20'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1, type: 'spring' },
                    }}
                  >
                    <Link
                      to={link.href}
                      className="text-lg"
                      onClick={() => handleNavClick(link.href)}
                    >
                      {link.name}
                    </Link>
                    {link.submenu && (
                      <motion.button
                        onClick={() => toggleSubmenu(link.name)}
                        className="text-white"
                        whileHover={{ scale: 1.1 }}
                        aria-label={`Toggle ${link.name} submenu`}
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-200 ${
                            openSubmenu === link.name ? 'rotate-180' : ''
                          }`}
                        />
                      </motion.button>
                    )}
                  </motion.div>
                  {/* Mobile Submenu */}
                  <AnimatePresence>
                    {link.submenu && openSubmenu === link.name && (
                      <motion.div
                        className="pl-6 space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, type: 'spring' }}
                      >
                        {link.submenu.map((subLink) => (
                          <Link
                            key={subLink.name}
                            to={subLink.href}
                            className="block py-2 px-4 text-white hover:bg-coral-500/20 rounded-lg"
                            onClick={() => handleNavClick(subLink.href)}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {/* Mobile Theme Toggle and Social Links */}
              <motion.div
                className="pt-4 border-t border-navy-700 flex justify-between items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <motion.button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full bg-navy-800 text-white hover:bg-coral-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/in/violachina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-coral-500"
                    aria-label="Visit Viola’s LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://twitter.com/violachina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-coral-500"
                    aria-label="Visit Viola’s Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      {scrolled && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-coral-500 to-emerald-500"
          initial={{ width: '0%' }}
          animate={{
            width: `${
              (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            }%`,
          }}
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.nav>
  );
};

export default React.memo(Navigation);