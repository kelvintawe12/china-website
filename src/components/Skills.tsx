import React, { useEffect, Children } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BrainCircuitIcon, HeartHandshakeIcon, BookOpenIcon, UsersIcon, LightbulbIcon, MicIcon } from 'lucide-react';
const Skills = () => {
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
  const skills = [{
    name: 'Communication',
    level: 95,
    icon: MicIcon
  }, {
    name: 'Customer Service',
    level: 90,
    icon: HeartHandshakeIcon
  }, {
    name: 'Sales',
    level: 92,
    icon: UsersIcon
  }, {
    name: 'Problem Solving',
    level: 85,
    icon: BrainCircuitIcon
  }];
  const interests = [{
    name: 'Entrepreneurship',
    icon: LightbulbIcon,
    description: 'Passionate about business creation and innovation'
  }, {
    name: 'Tech Solutions',
    icon: BrainCircuitIcon,
    description: 'Interested in how technology can solve business problems'
  }, {
    name: 'Communication',
    icon: MicIcon,
    description: 'Constantly improving communication skills'
  }, {
    name: 'Reading',
    icon: BookOpenIcon,
    description: 'Avid reader of business and self-improvement books'
  }, {
    name: 'Toastmasters',
    icon: MicIcon,
    description: 'Member of Toastmasters to enhance public speaking'
  }, {
    name: 'Leadership',
    icon: UsersIcon,
    description: 'Developing leadership skills through practice'
  }];
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
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
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
  const generateRandomDelay = () => Math.random() * 0.5;
  return <section id="skills" className="py-20 px-4 bg-[#1F2A44]">
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
          Skills & Interests
          <span className="block w-20 h-1 bg-[#FF6F61] mt-4 mx-auto"></span>
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div className="md:w-1/2" ref={ref} initial="hidden" animate={controls} variants={containerVariants}>
            <motion.h3 className="text-2xl font-bold mb-8 flex items-center" variants={itemVariants}>
              <BrainCircuitIcon className="mr-2 text-[#48BB78]" />
              Professional Skills
            </motion.h3>
            <div className="space-y-8">
              {skills.map(skill => <motion.div key={skill.name} variants={itemVariants}>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <skill.icon className="mr-2 text-[#48BB78]" size={18} />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-[#48BB78]">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 relative overflow-hidden group">
                    <motion.div className="bg-gradient-to-r from-[#48BB78] to-[#48BB78]/70 h-2.5 rounded-full" initial={{
                  width: 0
                }} animate={{
                  width: `${skill.level}%`
                }} transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                  delay: 0.5
                }} />
                    <motion.div className="absolute top-0 left-0 h-full w-full bg-white opacity-0 group-hover:opacity-20" initial={{
                  x: '-100%'
                }} animate={{
                  x: '100%'
                }} transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: 'easeInOut',
                  repeatDelay: 0.5
                }} />
                  </div>
                </motion.div>)}
            </div>
          </motion.div>
          <motion.div className="md:w-1/2" variants={containerVariants} initial="hidden" animate={controls}>
            <motion.h3 className="text-2xl font-bold mb-8 flex items-center" variants={itemVariants}>
              <HeartHandshakeIcon className="mr-2 text-[#FF6F61]" />
              Interests
            </motion.h3>
            <motion.div className="flex flex-wrap gap-3" variants={containerVariants}>
              {interests.map((interest, index) => <motion.div key={interest.name} className="px-4 py-3 bg-[#1a2436] rounded-lg border border-gray-700 group relative cursor-pointer" variants={itemVariants} initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: generateRandomDelay()
              }
            }} whileHover={{
              scale: 1.05,
              backgroundColor: '#FF6F61',
              rotate: [-1, 1, -1, 0],
              transition: {
                duration: 0.3
              }
            }}>
                  <div className="flex items-center">
                    <interest.icon size={16} className="mr-2 group-hover:text-white text-[#FF6F61]" />
                    <span className="font-medium group-hover:text-white">
                      {interest.name}
                    </span>
                  </div>
                  <motion.div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-[#FF6F61] text-white text-xs py-2 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible z-10 w-48 text-center" initial={{
                opacity: 0,
                y: -5
              }} whileHover={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.2
              }}>
                    {interest.description}
                  </motion.div>
                </motion.div>)}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Skills;