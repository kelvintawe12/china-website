import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
const HomePage = () => {
  return <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Gallery />
      <Contact />
    </>;
};
export default HomePage;