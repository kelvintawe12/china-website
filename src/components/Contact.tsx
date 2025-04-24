import React, { useEffect, Children } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon, SendIcon } from 'lucide-react';
const Contact = () => {
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
  const contactInfo = [{
    icon: MailIcon,
    title: 'Email',
    value: 'chinavioliny@gmail.com',
    link: 'mailto:chinavioliny@gmail.com'
  }, {
    icon: PhoneIcon,
    title: 'Phone',
    value: '+256786303581',
    link: 'tel:+256786303581'
  }, {
    icon: MapPinIcon,
    title: 'Address',
    value: 'Kampala, 10102, Uganda',
    link: '#'
  }, {
    icon: LinkedinIcon,
    title: 'LinkedIn',
    value: 'china-viola-7993411823',
    link: 'https://www.linkedin.com/in/china-viola-7993411823'
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
  const buttonVariants = {
    rest: {
      scale: 1
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 15px rgba(255,111,97,0.5)'
    },
    tap: {
      scale: 0.95
    }
  };
  return <section id="contact" className="py-20 px-4 bg-[#1a2436]">
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
          Get In Touch
          <span className="block w-20 h-1 bg-[#48BB78] mt-4 mx-auto"></span>
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div className="md:w-1/2" ref={ref} initial="hidden" animate={controls} variants={containerVariants}>
            <motion.h3 className="text-2xl font-bold mb-8" variants={itemVariants}>
              Contact Information
            </motion.h3>
            <div className="space-y-6">
              {contactInfo.map(info => <motion.a key={info.title} href={info.link} className="flex items-start p-4 bg-[#1F2A44] rounded-lg hover:bg-[#1F2A44]/80 transition-colors group" variants={itemVariants} target={info.title === 'LinkedIn' ? '_blank' : ''} rel={info.title === 'LinkedIn' ? 'noopener noreferrer' : ''}>
                  <motion.div className="p-3 bg-[#48BB78]/10 rounded-full mr-4 text-[#48BB78]" whileHover={{
                scale: 1.2,
                rotate: 10,
                backgroundColor: '#48BB78',
                color: 'white'
              }}>
                    <info.icon size={20} />
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-gray-300">{info.title}</h4>
                    <p className="text-white group-hover:text-[#48BB78] transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>)}
            </div>
            <motion.div className="mt-12 h-64 w-full bg-[#1F2A44] rounded-lg overflow-hidden relative" variants={itemVariants}>
              {/* Map placeholder - would be replaced with an actual map in a real implementation */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F2A44] to-[#1a3045] opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div className="text-[#48BB78] bg-[#1F2A44] p-4 rounded-full" animate={{
                scale: [1, 1.1, 1]
              }} transition={{
                repeat: Infinity,
                duration: 3
              }}>
                  <MapPinIcon size={32} />
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 bg-[#1F2A44]/90 p-2 rounded text-sm">
                Kampala, Uganda
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="md:w-1/2" variants={containerVariants} initial="hidden" animate={controls}>
            <motion.h3 className="text-2xl font-bold mb-8" variants={itemVariants}>
              Send Message
            </motion.h3>
            <motion.form className="space-y-6" variants={containerVariants} onSubmit={e => e.preventDefault()}>
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block mb-2 text-gray-300">
                  Your Name
                </label>
                <input type="text" id="name" className="w-full p-3 bg-[#1F2A44] border border-gray-700 rounded-lg focus:outline-none focus:border-[#FF6F61] focus:ring-1 focus:ring-[#FF6F61] transition-all" placeholder="John Doe" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block mb-2 text-gray-300">
                  Your Email
                </label>
                <input type="email" id="email" className="w-full p-3 bg-[#1F2A44] border border-gray-700 rounded-lg focus:outline-none focus:border-[#FF6F61] focus:ring-1 focus:ring-[#FF6F61] transition-all" placeholder="john@example.com" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block mb-2 text-gray-300">
                  Subject
                </label>
                <input type="text" id="subject" className="w-full p-3 bg-[#1F2A44] border border-gray-700 rounded-lg focus:outline-none focus:border-[#FF6F61] focus:ring-1 focus:ring-[#FF6F61] transition-all" placeholder="How can I help you?" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block mb-2 text-gray-300">
                  Message
                </label>
                <textarea id="message" rows={4} className="w-full p-3 bg-[#1F2A44] border border-gray-700 rounded-lg focus:outline-none focus:border-[#FF6F61] focus:ring-1 focus:ring-[#FF6F61] transition-all resize-none" placeholder="Your message here..."></textarea>
              </motion.div>
              <motion.button type="submit" className="px-6 py-3 bg-[#FF6F61] text-white rounded-lg font-medium flex items-center justify-center overflow-hidden relative" variants={buttonVariants} initial="rest" whileHover="hover" whileTap="tap">
                <span className="mr-2">Send Message</span>
                <SendIcon size={16} />
                <motion.span className="absolute inset-0 bg-white rounded-lg" initial={{
                scale: 0,
                opacity: 0
              }} whileTap={{
                scale: 4,
                opacity: 0,
                transition: {
                  duration: 0.5
                }
              }} transition={{
                type: 'spring'
              }} />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Contact;