import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUpIcon, LinkedinIcon, MailIcon, SendIcon } from 'lucide-react';
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const footerLinks = [{
    name: 'Home',
    href: '#hero'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Experience',
    href: '#experience'
  }, {
    name: 'Education',
    href: '#education'
  }, {
    name: 'Skills',
    href: '#skills'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  const socialLinks = [{
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/china-viola-7993411823',
    label: 'LinkedIn'
  }, {
    icon: MailIcon,
    href: 'mailto:chinavioliny@gmail.com',
    label: 'Email'
  }];
  return <footer className="bg-[#1F2A44] pt-16 pb-8 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          <motion.div className="md:w-1/3" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h3 className="text-2xl font-serif font-bold mb-4">VIOLA CHINA</h3>
            <p className="text-gray-400 mb-6">
              Sales Professional & Aspiring Entrepreneur with a passion for
              creating value and building lasting relationships.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(link => <motion.a key={link.label} href={link.href} aria-label={link.label} className="p-2 bg-[#1a2436] rounded-full text-gray-400 hover:text-white hover:bg-[#FF6F61] transition-colors" whileHover={{
              scale: 1.2,
              rotate: 10
            }} target={link.label === 'LinkedIn' ? '_blank' : ''} rel={link.label === 'LinkedIn' ? 'noopener noreferrer' : ''}>
                  <link.icon size={18} />
                </motion.a>)}
            </div>
          </motion.div>
          <motion.div className="md:w-1/3" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map(link => <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-[#48BB78] transition-colors relative group">
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#48BB78] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>)}
            </ul>
          </motion.div>
          <motion.div className="md:w-1/3" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }}>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates on my professional journey.
            </p>
            <form className="flex" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email" className="p-2 bg-[#1a2436] border border-gray-700 rounded-l-lg focus:outline-none focus:border-[#FF6F61] flex-grow" />
              <motion.button type="submit" className="p-2 bg-[#FF6F61] text-white rounded-r-lg" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <SendIcon size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Viola China. All rights reserved.
          </p>
          <motion.button onClick={scrollToTop} className="p-3 bg-[#1a2436] rounded-full text-white hover:bg-[#FF6F61] transition-colors" whileHover={{
          scale: 1.1,
          rotate: 360,
          transition: {
            duration: 0.5
          }
        }} aria-label="Back to top">
            <ChevronUpIcon size={20} />
          </motion.button>
        </div>
      </div>
    </footer>;
};
export default Footer;