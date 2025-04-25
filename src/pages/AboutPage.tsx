import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon, DownloadIcon } from 'lucide-react';

const AboutPage: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { scrollY } = useScroll({ target: ref });
  const waveY = useTransform(scrollY, [0, 500], [0, -50]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, type: 'spring', bounce: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.8, type: 'spring' },
    },
    hover: {
      scale: 1.1,
      rotateY: 10,
      boxShadow: '0px 20px 40px rgba(255, 127, 127, 0.5)',
      transition: { duration: 0.5 },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hover: {
      scale: 1.15,
      rotate: 8,
      boxShadow: '0px 0px 30px rgba(255, 127, 127, 0.6)',
      transition: { duration: 0.4 },
    },
  };

  const waveVariants = {
    animate: {
      y: [0, -15, 0],
      opacity: [0.3, 0.5, 0.3],
      transition: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleClick = (path: string): void => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'bio', label: 'Bio' },
    { id: 'contact', label: 'Contact' },
    { id: 'skills', label: 'Skills & Languages' },
    { id: 'work', label: 'Work History' },
    { id: 'education', label: 'Education' },
    { id: 'accomplishments', label: 'Accomplishments' },
    { id: 'interests', label: 'Interests' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  const bioText = `With over four years of experience, I excel in sales through exceptional communication and relationship-building skills. As an Insurance Agent at Icea Lion Group since February 2020, I proactively identify client needs and deliver tailored solutions. My role as a Customer Relationship Officer at Multi-Choice further honed my ability to foster lasting partnerships. Driven by an entrepreneurial mindset, I’m passionate about creating value and pursuing growth opportunities.`;

  return (
    <section
      id="about"
      className="relative bg-navy-500 py-24 px-6 overflow-hidden"
      aria-label="About Viola China"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: waveY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy-500 to-coral-500/20" />
        <motion.svg
          className="absolute bottom-0 w-full h-64 opacity-30"
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={waveVariants}
          animate="animate"
        >
          <path
            d="M0 100C240 40 480 160 720 100C960 40 1200 160 1440 100V200H0V100Z"
            fill="#FF7F7F"
          />
        </motion.svg>
        <div className="absolute inset-0 bg-[url('/images/abstract-pattern.jpg')] bg-cover bg-center opacity-10" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation (Desktop) */}
        <motion.aside
          className="hidden md:block w-72 sticky top-24"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <nav className="space-y-3 bg-white/5 backdrop-blur-md p-4 rounded-lg">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block px-4 py-2 text-gray-100 hover:bg-coral-500/30 hover:text-coral-400 rounded-md transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </motion.aside>

        {/* Mobile Menu */}
        <div className="md:hidden mb-8">
          <button
            className="w-full px-4 py-2 bg-coral-500 text-white rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 'Close Menu' : 'Menu'}
          </button>
          {isMobileMenuOpen && (
            <motion.nav
              className="mt-4 bg-white/5 backdrop-blur-md p-4 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block px-4 py-2 text-gray-100 hover:bg-coral-500/30 hover:text-coral-400 rounded-md"
                  onClick={() => handleClick(`#${item.id}`)}
                >
                  {item.label}
                </a>
              ))}
            </motion.nav>
          )}
        </div>

        {/* Main Content */}
        <div ref={ref} className="flex-1">
          {/* Bio */}
          <motion.div
            id="bio"
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="mb-20 text-center"
          >
            <h1
              className="text-5xl md:text-6xl font-sans font-bold text-white mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              About Viola China
            </h1>
            <div className="flex flex-col items-center gap-8 mb-8">
              <motion.div
                className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden relative"
                variants={imageVariants}
                whileHover="hover"
              >
                <img
                  src="/path-to-profile-image.jpg"
                  alt="Viola China"
                  className="object-cover w-full h-full"
                />
                <motion.div
                  className="absolute inset-0 border-4 border-coral-400 rounded-full"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>
              <p className="text-xl text-coral-200 max-w-2xl mx-auto">
                Sales Professional | Connector | Innovator
              </p>
            </div>
            <motion.p
              variants={sectionVariants}
              className="text-base md:text-lg text-gray-100 max-w-3xl mx-auto leading-relaxed bg-white/10 backdrop-blur-md p-8 rounded-xl"
            >
              {bioText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.02 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            id="contact"
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <h2 className="text-4xl font-semibold text-white mb-8 text-center">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                { icon: MapPinIcon, text: 'Kampala, 10102' },
                { icon: PhoneIcon, text: '+256786303581' },
                {
                  icon: MailIcon,
                  text: 'chinavioliny@gmail.com',
                  href: 'mailto:chinavioliny@gmail.com',
                },
                {
                  icon: GlobeIcon,
                  text: 'LinkedIn Profile',
                  href: 'https://www.linkedin.com/in/china-viola-799341182',
                  target: '_blank',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="flex items-center space-x-4 text-gray-100 bg-white/10 backdrop-blur-md p-5 rounded-xl"
                >
                  <item.icon className="w-6 h-6 text-coral-400" />
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.target ? 'noopener noreferrer' : undefined}
                      className="hover:text-coral-400 transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
            <motion.button
              variants={cardVariants}
              whileHover={{ scale: 1.15, boxShadow: '0px 0px 25px rgba(255, 127, 127, 0.6)' }}
              whileTap={{ scale: 0.9 }}
              className="mt-8 mx-auto block px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white rounded-lg font-medium text-lg transition-all duration-300"
              onClick={() => handleClick('mailto:chinavioliny@gmail.com')}
            >
              Connect with Me
            </motion.button>
            <motion.button
              variants={cardVariants}
              whileHover={{ scale: 1.15, boxShadow: '0px 0px 25px rgba(59, 74, 107, 0.6)' }}
              whileTap={{ scale: 0.9 }}
              className="mt-4 mx-auto block px-8 py-4 bg-navy-600 hover:bg-navy-700 text-white rounded-lg font-medium text-lg transition-all duration-300"
              onClick={() => handleClick('/path-to-cv.pdf')}
            >
              <DownloadIcon className="w-5 h-5 inline-block mr-2" />
              Download CV
            </motion.button>
          </motion.div>

          {/* Skills and Languages */}
          <motion.div
            id="skills"
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <h2 className="text-4xl font-semibold text-white mb-8 text-center">Skills & Languages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white/10 backdrop-blur-md p-8 rounded-xl"
              >
                <h3 className="text-2xl font-medium text-coral-200 mb-4">Skills</h3>
                <ul className="text-gray-100 space-y-3">
                  <li>Great Communication Skills</li>
                  <li>Customer Service</li>
                  <li>Sales</li>
                </ul>
              </motion.div>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white/10 backdrop-blur-md p-8 rounded-xl"
              >
                <h3 className="text-2xl font-medium text-coral-200 mb-4">Languages</h3>
                <ul className="text-gray-100 space-y-3">
                  <li>English: Native</li>
                  <li>Luganda: Native</li>
                  <li>Arabic: B1</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Work History (Timeline) */}
          <motion.div
            id="work"
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <h2 className="text-4xl font-semibold text-white mb-8 text-center">Work History</h2>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 top-0 w-1 h-full bg-coral-400/50" />
              {[
                {
                  title: 'Insurance Agent',
                  company: 'Icea Lion Group, Kampala, Uganda',
                  period: 'Feb 2020 – Present',
                  description: 'Delivering tailored insurance solutions and building strong client relationships.',
                },
                {
                  title: 'Customer Relationship Officer',
                  company: 'Multi-Choice, Kampala, Uganda',
                  period: 'May 2023 – Oct 2023',
                  description: 'Enhanced customer satisfaction through proactive engagement and support.',
                },
              ].map((job, index) => (
                <motion.div
                  key={index}
                  variants={timelineVariants}
                  whileHover="hover"
                  className="mb-8 flex items-center"
                >
                  <div className="w-8 h-8 bg-coral-400 rounded-full mr-4 z-10 animate-pulse" />
                  <div className="flex-1 bg-white/10 backdrop-blur-md p-6 rounded-xl">
                    <h3 className="text-xl font-medium text-coral-200">{job.title}</h3>
                    <p className="text-gray-100">{job.company} | {job.period}</p>
                    <p className="text-gray-200 mt-2">{job.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education (Timeline) */}
          <motion.div
            id="education"
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <h2 className="text-4xl font-semibold text-white mb-8 text-center">Education</h2>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 top-0 w-1 h-full bg-coral-400/50" />
              {[
                {
                  degree: 'Diploma in Insurance and Risk Management',
                  institution: 'Insurance Training College, Kampala, Uganda',
                  period: 'Expected Jun 2025',
                  description: 'Pursuing advanced knowledge in insurance and risk management.',
                },
                {
                  degree: 'Certificate in Insurance and Risk Management',
                  institution: 'Insurance Training College, Kampala, Uganda',
                  period: 'Dec 2022',
                  description: 'Gained foundational skills in insurance practices.',
                },
                {
                  degree: 'High School Diploma',
                  institution: 'Kisubi Mapeera Secondary School, Kampala, Uganda',
                  period: 'Dec 2019',
                  description: 'Completed secondary education with a focus on leadership.',
                },
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  variants={timelineVariants}
                  whileHover="hover"
                  className="mb-8 flex items-center"
                >
                  <div className="w-8 h-8 bg-coral-400 rounded-full mr-4 z-10 animate-pulse" />
                  <div className="flex-1 bg-white/10 backdrop-blur-md p-6 rounded-xl">
                    <h3 className="text-xl font-medium text-coral-200">{edu.degree}</h3>
                    <p className="text-gray-100">{edu.institution} | {edu.period}</p>
                    <p className="text-gray-200 mt-2">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Accomplishments */}
          <motion.div
            id="accomplishments"
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <h2 className="text-4xl font-semibold text-white mb-8 text-center">Accomplishments</h2>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl max-w-3xl mx-auto text-gray-100"
            >
              <p>
                Second runner-up in Africa at the Tertiary Essay Competition in the Insurance Industry, organized by the Young
                Insurance Professionals in partnership with Africa Re, awarded in Namibia, 2024.
              </p>
            </motion.div>
          </motion.div>

          {/* Interests */}
          <motion.div
            id="interests"
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <h2 className="text-4xl font-semibold text-white mb-8 text-center">Interests</h2>
            <motion.div
              className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
            >
              {[
                'Entrepreneurship',
                'Intermediate Tech Solutions',
                'Communication',
                'Reading',
                'Toastmasters',
                'Leadership',
              ].map((interest) => (
                <motion.span
                  key={interest}
                  variants={cardVariants}
                  whileHover={{ scale: 1.2, rotate: 5, boxShadow: '0px 0px 15px rgba(255, 127, 127, 0.5)' }}
                  className="px-5 py-3 bg-coral-500/20 text-gray-100 rounded-full text-sm transition-colors"
                >
                  {interest}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Testimonials (Placeholder) */}
          <motion.div
            id="testimonials"
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-4xl font-semibold text-white mb-8 text-center">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  quote: 'Viola’s client-focused approach transformed our insurance experience.',
                  author: 'Client, Icea Lion Group',
                },
                {
                  quote: 'Her communication skills are unmatched in building trust.',
                  author: 'Colleague, Multi-Choice',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-gray-100"
                >
                  <p className="italic">“{testimonial.quote}”</p>
                  <p className="mt-4 text-coral-200">— {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;