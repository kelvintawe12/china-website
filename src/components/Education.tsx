import React, { useEffect, Children } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCapIcon, AwardIcon, SparklesIcon } from 'lucide-react';
const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  const education = [{
    title: 'Diploma In Insurance: Insurance And Risk Management',
    institution: 'Insurance Training College',
    location: 'Kampala, Uganda',
    period: 'Expected in 2025-06',
    icon: GraduationCapIcon
  }, {
    title: 'Certificate In Insurance: Insurance And Risk Management',
    institution: 'Insurance Training College',
    location: 'Kampala, Uganda',
    period: '2022-12',
    icon: GraduationCapIcon
  }, {
    title: 'High School Diploma',
    institution: 'Kisubi Mapeera Secondary School',
    location: 'Kampala, Uganda',
    period: '2019-12',
    icon: GraduationCapIcon
  }];
  const accomplishment = {
    title: 'Africa-wide Essay Competition Award',
    description: 'Emerged as the second runner up in Africa at the tertiary Essay competition in the Insurance Industry organized by the Young Insurance Professionals in partnership with Africa Re.',
    year: '2024',
    location: 'Namibia',
    icon: AwardIcon
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateY: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };
  const iconVariants = {
    hidden: {
      scale: 0
    },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      color: '#48BB78',
      transition: {
        duration: 0.3
      }
    }
  };
  return <section id="education" className="py-20 px-4 bg-[#1a2436]">
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
          Education & Accomplishments
          <span className="block w-20 h-1 bg-[#48BB78] mt-4 mx-auto"></span>
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={ref} initial="hidden" animate={controls} variants={containerVariants}>
              {education.map((edu, index) => <motion.div key={edu.title} className="bg-[#1F2A44] p-6 rounded-lg shadow-lg hover:shadow-[#48BB78]/20 transition-all duration-300" variants={cardVariants} whileHover={{
              scale: 1.03,
              rotateY: 5,
              boxShadow: '0 10px 25px rgba(72, 187, 120, 0.2)'
            }} style={{
              transformStyle: 'preserve-3d'
            }}>
                  <motion.div className="inline-block p-3 rounded-full bg-[#1a2436] mb-4" variants={iconVariants} whileHover="hover">
                    <edu.icon size={24} className="text-[#48BB78]" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{edu.title}</h3>
                  <h4 className="text-[#48BB78] mb-1">{edu.institution}</h4>
                  <p className="text-gray-400 mb-2">{edu.location}</p>
                  <p className="text-gray-400">{edu.period}</p>
                </motion.div>)}
            </motion.div>
          </div>
          <motion.div className="md:w-1/3" variants={containerVariants} initial="hidden" animate={controls}>
            <motion.div className="bg-[#1F2A44] p-6 rounded-lg shadow-lg h-full relative overflow-hidden border border-[#FF6F61]/20" variants={cardVariants} whileHover={{
            scale: 1.03,
            boxShadow: '0 10px 25px rgba(255, 111, 97, 0.3)'
          }}>
              <motion.div className="absolute -top-10 -right-10 w-40 h-40 opacity-10" animate={{
              rotate: [0, 360]
            }} transition={{
              repeat: Infinity,
              duration: 20,
              ease: 'linear'
            }}>
                <SparklesIcon size={160} className="text-[#FF6F61]" />
              </motion.div>
              <motion.div className="inline-block p-3 rounded-full bg-[#1a2436] mb-4 relative z-10" variants={iconVariants} whileHover="hover">
                <accomplishment.icon size={24} className="text-[#FF6F61]" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-[#FF6F61]">
                {accomplishment.title}
              </h3>
              <p className="text-gray-300 mb-4">{accomplishment.description}</p>
              <div className="flex items-center justify-between text-gray-400 mt-6">
                <span>{accomplishment.year}</span>
                <span>{accomplishment.location}</span>
              </div>
              <motion.div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6F61] to-[#48BB78]" initial={{
              scaleX: 0
            }} animate={{
              scaleX: 1
            }} transition={{
              delay: 1,
              duration: 1
            }} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Education;