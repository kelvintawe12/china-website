import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';

const Hero: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll({ target: ref });
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 50]);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
      },
    },
  };

  const handleClick = (path: string): void => {
    window.location.href = path;
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1F2A44] via-[#1a3045] to-[#2A4365] px-4"
    >
      {/* Background Particles */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
            transition={{ delay: Math.random() * 2 }}
          />
        ))}
      </motion.div>

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-8"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight text-white leading-tight"
            variants={itemVariants}
          >
            Smart Insurance Solutions for<br />Individuals, Families & Businesses
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Expert-led life covers, education plans, retirement savings, and business protection. Secure your future with a free consultation.
          </motion.p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.button
            className="px-8 py-4 bg-[#FF6F61] hover:bg-[#FF6F61]/80 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-[#FF6F61]/40 focus:outline-none focus:ring-4 focus:ring-[#FF6F61]/50"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotate: 2,
              boxShadow: '0 0 25px rgba(255,111,97,0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick('/get-life-insurance-quote')}
          >
            Get a Life Insurance Quote
          </motion.button>
          <motion.button
            className="px-8 py-4 bg-[#48BB78] hover:bg-[#48BB78]/80 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-[#48BB78]/40 focus:outline-none focus:ring-4 focus:ring-[#48BB78]/50"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotate: -2,
              boxShadow: '0 0 25px rgba(72,187,120,0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick('/protect-your-business')}
          >
            Protect Your Business
          </motion.button>
          <motion.button
            className="px-8 py-4 bg-[#2563EB] hover:bg-[#2563EB]/80 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-[#2563EB]/40 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/50"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotate: 2,
              boxShadow: '0 0 25px rgba(37,99,235,0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick('/book-free-meeting')}
          >
            Book a Free Meeting
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24">
        <svg viewBox="0 0 1440 100" className="w-full h-full text-[#1a3045]">
          <path
            fill="currentColor"
            d="M0,0 C360,80 1080,80 1440,0 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;