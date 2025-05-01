import React, { useEffect, Children } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BriefcaseIcon, ChevronRightIcon } from 'lucide-react';
const Experience = () => {
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
  const experiences = [{
    title: 'Insurance Agent',
    company: 'Icea Lion Group',
    location: 'Kampala, Uganda',
    period: '2020-02 - Current',
    description: 'Providing tailored insurance solutions to clients through effective communication and relationship building.'
  }, {
    title: 'Customer Relationship Officer',
    company: 'Multi-Choice',
    location: 'Kampala, Uganda',
    period: '2023-05 - 2023-10',
    description: 'Managed customer relationships and provided exceptional service to ensure client satisfaction and retention.'
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  };
  interface ExperienceItem {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
  }

  interface CardVariants {
    [key: string]: {
      opacity?: number;
      x?: number;
      scale?: number;
      rotate?: number;
      color?: string;
      transition?: {
        duration?: number;
        ease?: string;
        type?: string;
        stiffness?: number;
        damping?: number;
      };
    };
  }

  const cardVariants = (index: number): CardVariants => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  });
  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      color: '#FF6F61',
      transition: {
        duration: 0.3
      }
    }
  };
  return <section id="experience" className="py-20 px-4 bg-[#1F2A44]">
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
          Work Experience
          <span className="block w-20 h-1 bg-[#FF6F61] mt-4 mx-auto"></span>
        </motion.h2>
        <motion.div className="relative" ref={ref} initial="hidden" animate={controls} variants={containerVariants}>
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700/30 z-0">
            <motion.div className="w-full bg-[#FF6F61]" style={{
            height: '0%'
          }} animate={{
            height: inView ? '100%' : '0%'
          }} transition={{
            duration: 1.5,
            ease: 'easeOut'
          }} />
          </div>
          {experiences.map((exp, index) => <motion.div key={exp.title} className={`flex flex-col md:flex-row items-center mb-16 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} variants={cardVariants(index)}>
              {/* Timeline Dot */}
              <motion.div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#1F2A44] border-4 border-[#FF6F61] z-10" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.6 + index * 0.2,
            duration: 0.5,
            type: 'spring'
          }} />
              {/* Content */}
              <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                <motion.div className="bg-[#1a2436] p-6 rounded-lg shadow-lg hover:shadow-[#FF6F61]/20 transition-all duration-300" whileHover={{
              y: -10,
              boxShadow: '0 15px 30px rgba(255, 111, 97, 0.2)'
            }}>
                  <motion.div className="inline-block p-3 rounded-full bg-[#1F2A44] mb-4" variants={iconVariants} whileHover="hover">
                    <BriefcaseIcon size={24} className="text-[#48BB78]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                  <h4 className="text-[#FF6F61] mb-2">{exp.company}</h4>
                  <p className="text-gray-400 mb-4">
                    {exp.location} | {exp.period}
                  </p>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  <motion.a href="#" className="inline-flex items-center text-[#48BB78] group" whileHover={{
                x: 5
              }}>
                    Learn More
                    <motion.span initial={{
                  x: 0,
                  opacity: 0.7
                }} animate={{
                  x: [0, 5, 0],
                  opacity: 1
                }} transition={{
                  repeat: Infinity,
                  duration: 1.5
                }}>
                      <ChevronRightIcon size={16} className="ml-1" />
                    </motion.span>
                  </motion.a>
                </motion.div>
              </div>
              {/* Empty space for timeline */}
              <div className="md:w-2/12"></div>
              {/* Date - Mobile Only */}
              <div className="md:hidden text-center my-4">
                <span className="px-4 py-2 bg-[#FF6F61] rounded-full text-white text-sm">
                  {exp.period}
                </span>
              </div>
              {/* Date - Desktop */}
              <div className={`hidden md:block md:w-5/12 ${index % 2 === 0 ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'}`}>
                <span className="px-4 py-2 bg-[#FF6F61] rounded-full text-white text-sm">
                  {exp.period}
                </span>
              </div>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
};
export default Experience;