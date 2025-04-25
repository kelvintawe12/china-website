// Project: viola-china
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Download, ArrowUp, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from './ErrorBoundary';
import violaData from '../data/viola-data.json';

interface Experience {
  year: number;
  title: string;
  company: string;
  description: string;
  skills?: string[];
}

interface Education {
  year: number;
  title: string;
  institution: string;
  description: string;
}

// Fallback data if viola-data.json is missing or malformed
const fallbackExperience: Experience[] = [
  {
    year: 2023,
    title: 'Placeholder Role',
    company: 'Placeholder Company',
    description: 'Placeholder description for experience.',
    skills: ['Leadership', 'Management'],
  },
];

const fallbackEducation: Education[] = [
  {
    year: 2020,
    title: 'Placeholder Degree',
    institution: 'Placeholder Institution',
    description: 'Placeholder description for education.',
  },
];

const ExperiencePage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Validate and use data
  const experienceData = useMemo(() => {
    try {
      if (Array.isArray(violaData.experience) && violaData.experience.length > 0) {
        return violaData.experience as Experience[];
      }
      console.warn('Invalid or empty experience data, using fallback');
      return fallbackExperience;
    } catch (error) {
      console.error('Failed to load experience data:', error);
      return fallbackExperience;
    }
  }, []);

  const educationData = useMemo(() => {
    try {
      if (Array.isArray(violaData.education) && violaData.education.length > 0) {
        return violaData.education as Education[];
      }
      console.warn('Invalid or empty education data, using fallback');
      return fallbackEducation;
    } catch (error) {
      console.error('Failed to load education data:', error);
      return fallbackEducation;
    }
  }, []);

  // Dynamic skills
  const skills = useMemo(() => {
    const uniqueSkills = new Set<string>();
    experienceData.forEach((exp) => {
      if (exp.skills) {
        exp.skills.forEach((skill) => uniqueSkills.add(skill));
      }
    });
    return ['All', ...Array.from(uniqueSkills)];
  }, [experienceData]);

  // Filtered experience
  const filteredExperience = useMemo(() => {
    return experienceData.filter(
      (exp) =>
        selectedSkill === 'All' || (exp.skills && exp.skills.includes(selectedSkill))
    );
  }, [experienceData, selectedSkill]);

  // Toggle expand
  const toggleExpand = (year: number) => {
    setExpanded(expanded === year ? null : year);
  };

  // Back to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <ErrorBoundary
      fallback={
        <div className="py-20 px-4 text-center text-white bg-navy-900">
          Failed to load experience page. Please try again later.
        </div>
      }
    >
      <Helmet>
        <title>Viola China | Experience & Education</title>
        <meta
          name="description"
          content="Explore Viola China's professional experience and education background."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Viola China',
            jobTitle: experienceData[0]?.title || 'Professional',
            worksFor: experienceData[0]?.company || 'Various',
            alumniOf: educationData.map((edu) => ({
              '@type': 'EducationalOrganization',
              name: edu.institution,
            })),
          })}
        </script>
      </Helmet>
      <section className="py-20 px-4 sm:px-6 bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          >
            Experience & Education
            <span className="block w-20 h-1 bg-coral-500 mt-4 mx-auto" />
          </motion.h1>

          {/* Skills Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {skills.map((skill) => (
              <motion.button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedSkill === skill
                    ? 'bg-coral-500 text-white'
                    : 'bg-navy-800 text-gray-300 hover:bg-coral-500/20'
                }`}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 10px rgba(255, 111, 97, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={selectedSkill === skill}
              >
                {skill}
              </motion.button>
            ))}
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">Professional Experience</h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 w-1 bg-coral-500 h-full transform -translate-x-1/2" />
              {filteredExperience.map((exp: Experience, index: number) => (
                <motion.div
                  key={exp.year}
                  className={`flex mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, type: 'spring', stiffness: 120 }}
                >
                  <div className="w-full md:w-1/2 p-4">
                    <motion.div
                      className="bg-navy-800 rounded-xl p-6 shadow-lg cursor-pointer"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 10px 20px rgba(255, 111, 97, 0.3)',
                      }}
                      onClick={() => toggleExpand(exp.year)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          toggleExpand(exp.year);
                        }
                      }}
                      aria-expanded={expanded === exp.year}
                      aria-label={`Toggle details for ${exp.title} at ${exp.company}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Briefcase className="text-coral-500" size={20} />
                          <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        </div>
                        <motion.div
                          animate={{ rotate: expanded === exp.year ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="text-coral-500" size={20} />
                        </motion.div>
                      </div>
                      <p className="text-gray-300">{exp.company}</p>
                      <p className="text-sm text-gray-400">{exp.year}</p>
                      <AnimatePresence>
                        {expanded === exp.year && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-gray-300 mt-2">{exp.description}</p>
                            {exp.skills && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {exp.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="bg-coral-500/20 text-coral-500 px-2 py-1 rounded-full text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Education</h2>
            <div className="space-y-8">
              {educationData.map((edu: Education, index: number) => (
                <motion.div
                  key={edu.year}
                  className="bg-navy-800 rounded-xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, type: 'spring', stiffness: 120 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 10px 20px rgba(255, 111, 97, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="text-coral-500" size={20} />
                    <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                  </div>
                  <p className="text-gray-300">{edu.institution}</p>
                  <p className="text-sm text-gray-400">{edu.year}</p>
                  <p className="text-gray-300 mt-2">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Resume Download */}
          {violaData.resume && (
            <motion.a
              href={violaData.resume}
              className="mt-12 mx-auto block w-fit bg-coral-500 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: '0 4px 10px rgba(255, 111, 97, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Viola’s resume"
            >
              <Download size={20} />
              Download Resume
            </motion.a>
          )}

          {/* Back to Top */}
          <AnimatePresence>
            {isVisible && (
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 bg-coral-500 text-white p-3 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Back to top"
              >
                <ArrowUp size={24} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default React.memo(ExperiencePage);