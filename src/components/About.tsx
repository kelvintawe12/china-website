import React, { useEffect, Children } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };
  const skillBadges = ['Communication', 'Sales', 'Customer Service', 'Relationship Building', 'Problem Solving', 'Insurance'];
  return <section id="about" className="py-20 px-4 bg-[#1a2436]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 className="text-4xl font-serif font-bold mb-16 text-center" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
          About Me
          <span className="block w-20 h-1 bg-[#48BB78] mt-4 mx-auto"></span>
        </motion.h2>
        <motion.div className="flex flex-col md:flex-row items-center gap-10" ref={ref} initial="hidden" animate={controls} variants={containerVariants}>
          <motion.div className="md:w-1/2 relative" variants={itemVariants}>
            <motion.div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#48BB78] mx-auto relative shadow-[0_0_25px_rgba(72,187,120,0.4)]" whileHover={{
            scale: 1.05
          }} animate={{
            boxShadow: ['0 0 25px rgba(72,187,120,0.2)', '0 0 25px rgba(72,187,120,0.8)', '0 0 25px rgba(72,187,120,0.2)']
          }} transition={{
            boxShadow: {
              repeat: Infinity,
              duration: 3
            }
          }}>
              <img src="/Screenshot_24-4-2025_165552_.jpg" alt="Viola China" className="w-full h-full object-cover object-top" />
            </motion.div>
          </motion.div>
          <motion.div className="md:w-1/2" variants={itemVariants}>
            <h3 className="text-3xl font-serif font-bold mb-4 text-[#FF6F61]">
              Viola China
            </h3>
            <p className="text-lg mb-6 text-gray-300 leading-relaxed">
              Experienced sales professional with four years of hands-on
              experience driving results through effective communication and
              relationship-building skills. Known for a proactive approach in
              identifying clients' needs and providing tailored solutions, I
              have a proven ability to engage customers and foster lasting
              partnerships.
            </p>
            <p className="text-lg mb-8 text-gray-300 leading-relaxed">
              My time in sales has sharpened my understanding of entrepreneurial
              values, instilling a passion for creating value and pursuing
              growth opportunities.
            </p>
            <div className="flex flex-wrap gap-3">
              {skillBadges.map((skill, index) => <motion.div key={skill} className="px-4 py-2 bg-[#1F2A44] rounded-full text-white border border-[#48BB78]/30 cursor-pointer group relative" whileHover={{
              scale: 1.1,
              backgroundColor: '#48BB78',
              transition: {
                duration: 0.2
              }
            }} initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.5 + index * 0.1
              }
            }}>
                  {skill}
                  <motion.span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[#48BB78] text-white text-xs py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible z-10 whitespace-nowrap" initial={{
                opacity: 0,
                y: -5
              }} whileHover={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.2
              }}>
                    Expert in {skill}
                  </motion.span>
                </motion.div>)}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default About;