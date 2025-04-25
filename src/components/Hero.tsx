import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';

const Hero = () => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  interface HandleClickProps {
    path: string;
  }

  const handleClick = (path: HandleClickProps['path']): void => {
    window.location.href = path;
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1F2A44] to-[#1a3045] px-4">
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          className="mb-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-wide text-white" variants={itemVariants}>
            Smart Insurance Solutions for individuals, families & Businesses—Secure Your Future Today.
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-gray-300 mb-8" variants={itemVariants}>
            Expert-led life covers, education plans, retirement savings, and business protection. Get a free, no-obligation consultation.
          </motion.p>
        </motion.div>
        <motion.div className="flex flex-col md:flex-row justify-center gap-4" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.button
            className="px-6 py-3 bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-[#FF6F61]/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-opacity-50"
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,111,97,0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick('/life-insurance')}
          >
            Get a Life Insurance Quote
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-[#48BB78] hover:bg-[#48BB78]/90 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-[#48BB78]/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#48BB78] focus:ring-opacity-50"
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(72,187,120,0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick('/general-insurance')}
          >
            Protect Your Business
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-[#2563EB]/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-50"
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(37,99,235,0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick('/meeting-scheduler')}
          >
            Book a Free Meeting
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
