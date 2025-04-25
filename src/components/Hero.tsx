import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';

const Hero: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll({ target: ref });
  const backgroundY = useTransform(scrollY, [0, 300], [0, 50]);
  const textY = useTransform(scrollY, [0, 300], [0, 15]);

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/images/professional-office.jpg',
    '/images/insurance-meeting.jpg',
    '/images/client-handshake.jpg',
  ];

  useEffect(() => {
    controls.start('visible');

    // Slideshow interval
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, type: 'spring', bounce: 0.4 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.15,
      rotateX: [0, 10, -10, 0],
      boxShadow: '0px 0px 25px rgba(255, 127, 127, 0.6)',
      transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' },
    },
    tap: { scale: 0.85, rotateX: 0 },
  };

  const orbVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 20, 0],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.3, 1],
      transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
    },
  };

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 0.7, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const handleClick = (path: string): void => {
    window.location.href = path;
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-500 px-6"
    >
      {/* Background Slideshow */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {slides.map((slide, index) => (
          <motion.img
            key={slide}
            src={slide}
            alt={`Slide ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            variants={slideVariants}
            initial="exit"
            animate={index === currentSlide ? 'center' : 'exit'}
            exit="exit"
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-500/50 to-coral-500/20" />
      </motion.div>

      {/* Floating Orbs */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 bg-coral-300/30 rounded-full blur-xl"
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + i * 15}%`,
            }}
            variants={orbVariants}
            animate="animate"
            initial={{ scale: 0.5, opacity: 0.1 }}
            transition={{ delay: i * 0.4 }}
          />
        ))}
      </motion.div>

      {/* Hero Content */}
      <div className="max-w-3xl mx-auto text-center z-10">
        <motion.div
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-8"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="w-24 h-24 rounded-full bg-gray-300 mx-auto overflow-hidden"
          >
            <img
              src="/path-to-profile-image.jpg"
              alt="Viola China"
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Name and Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-sans font-bold text-white leading-tight"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Viola China
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-coral-200"
          >
            Sales Professional
          </motion.p>

          {/* Summary */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-100 max-w-xl mx-auto leading-relaxed"
          >
            Over four years of driving success in sales through strong client relationships and tailored solutions.
            Thriving as an <span className="text-coral-400">Insurance Agent</span> at Icea Lion Group since 2020 and
            previously a <span className="text-coral-400">Customer Relationship Officer</span> at Multi-Choice.
          </motion.p>

          {/* Call to Action */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-lg font-medium text-base transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-coral-500/50"
              onClick={() => handleClick('mailto:chinavioliny@gmail.com')}
            >
              Connect with Me
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-3 bg-navy-600 hover:bg-navy-700 text-white rounded-lg font-medium text-base transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-navy-600/50"
              onClick={() => handleClick('https://www.linkedin.com/in/china-viola-799341182')}
            >
              LinkedIn Profile
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0], rotate: [0, 360], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <ArrowDownIcon className="w-8 h-8 text-coral-400 drop-shadow-md" />
      </motion.div>
    </section>
  );
};

export default Hero;