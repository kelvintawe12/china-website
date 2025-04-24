import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, GithubIcon, StarIcon } from 'lucide-react';
const projects = [{
  id: 1,
  title: 'Insurance Solutions Platform',
  description: 'A comprehensive platform for managing insurance policies and claims, featuring real-time updates and client communication tools.',
  technologies: ['React', 'Node.js', 'MongoDB'],
  category: 'Professional',
  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
  link: '#',
  featured: true
}, {
  id: 2,
  title: 'Customer Relations Dashboard',
  description: 'Interactive dashboard for tracking and managing customer relationships, with analytics and reporting features.',
  technologies: ['React', 'TypeScript', 'Chart.js'],
  category: 'Professional',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
  link: '#'
}
// Add more projects as needed
];
const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Professional', 'Personal', 'Open Source'];
  return <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }}>
          Projects & Portfolio
          <span className="block w-20 h-1 bg-[#FF6F61] mt-4 mx-auto"></span>
        </motion.h1>
        {/* Featured Project */}
        {projects.filter(p => p.featured).map(project => <motion.div key={project.id} className="mb-20" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
              <div className="relative rounded-xl overflow-hidden bg-[#1a2436] shadow-xl">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#FF6F61] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured Project
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                    <p className="text-gray-300 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map(tech => <span key={tech} className="bg-[#2D3748] px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>)}
                    </div>
                    <div className="flex gap-4">
                      <motion.a href={project.link} className="flex items-center gap-2 bg-[#FF6F61] text-white px-4 py-2 rounded-lg" whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                        <ExternalLinkIcon size={18} />
                        View Project
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>)}
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.filter(p => !p.featured).map(project => <motion.div key={project.id} className="bg-[#1a2436] rounded-xl overflow-hidden shadow-lg" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} whileHover={{
          y: -5
        }}>
                <div className="aspect-video relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => <span key={tech} className="bg-[#2D3748] px-2 py-1 rounded-full text-xs">
                        {tech}
                      </span>)}
                  </div>
                  <motion.a href={project.link} className="inline-flex items-center gap-2 text-[#FF6F61] hover:text-white" whileHover={{
              x: 5
            }}>
                    View Project
                    <ExternalLinkIcon size={16} />
                  </motion.a>
                </div>
              </motion.div>)}
        </div>
      </div>
    </section>;
};
export default ProjectsPage;