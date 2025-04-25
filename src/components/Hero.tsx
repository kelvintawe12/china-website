import React, { useEffect, Children } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowDownIcon, LinkedinIcon, MailIcon } from 'lucide-react';

const Hero = () => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start('visible');
  }, [controls]);
  const nameVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1F2A44] to-[#1a3045] px-4">
      <div className="max-w-7xl mx-auto text-center z-10">
        <motion.h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 tracking-wider" variants={nameVariants} initial="hidden" animate={controls}>
          Smart Insurance Solutions for individuals, families & Businesses—Secure Your Future Today.
        </motion.h1>
        <motion.p className="text-xl md:text-2xl mb-8 text-gray-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
          Expert-led life covers, education plans, retirement savings, and business protection. Get a free, no-obligation consultation.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}>
          <motion.button className="px-8 py-3 bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-[#FF6F61]/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-opacity-50" whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,111,97,0.5)' }} whileTap={{ scale: 0.98 }}>
            View My Work
            <ArrowDownIcon className="inline-block ml-2" size={18} />
          </motion.button>
        </motion.div>
        <motion.div className="absolute bottom-10 left-0 right-0 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDownIcon className="text-white/70 h-8 w-8" />
          </motion.div>
        </motion.div>
        <motion.div className="absolute top-10 right-10 flex space-x-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}>
          <motion.a href="https://www.linkedin.com/in/china-viola-7993411823" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, rotate: 10, color: '#0077B5' }} className="text-white/80 hover:text-white transition-colors">
            <LinkedinIcon size={24} />
          </motion.a>
          <motion.a href="mailto:chinavioliny@gmail.com" whileHover={{ scale: 1.2, rotate: 10, color: '#FF6F61' }} className="text-white/80 hover:text-white transition-colors">
            <MailIcon size={24} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
