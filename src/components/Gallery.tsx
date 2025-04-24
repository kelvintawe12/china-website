import React, { useCallback, useEffect, useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FilterIcon, GridIcon, ColumnsIcon } from 'lucide-react';
import GalleryCard from './gallery/GalleryCard';
import GalleryModal from './gallery/GalleryModal';
const galleryData = [{
  id: 1,
  title: 'Africa Essay Competition Award',
  date: 'March 2024',
  category: 'Awards',
  description: 'Second runner-up at the Africa-wide Essay Competition in Namibia',
  imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80'
}, {
  id: 2,
  title: 'Insurance Industry Conference',
  date: 'January 2024',
  category: 'Conferences',
  description: 'Speaking at the annual Insurance Industry Conference',
  imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80'
}, {
  id: 3,
  title: 'Toastmasters Leadership Event',
  date: 'December 2023',
  category: 'Community',
  description: 'Leading a session at Toastmasters',
  imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80'
}
// Add more items as needed
];
const categories = ['All', 'Awards', 'Conferences', 'Community'];
const Gallery = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [layout, setLayout] = useState<'grid' | 'columns'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filteredImages = selectedCategory === 'All' ? galleryData : galleryData.filter(item => item.category === selectedCategory);
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') {
        const currentIndex = galleryData.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % galleryData.length;
        setSelectedImage(galleryData[nextIndex]);
      }
      if (e.key === 'ArrowLeft') {
        const currentIndex = galleryData.findIndex(img => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        setSelectedImage(galleryData[prevIndex]);
      }
    }
  }, [selectedImage]);
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
  return <section id="gallery" className="py-20 px-4 bg-[#1a2436]">
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
          Event Gallery
          <span className="block w-20 h-1 bg-[#FF6F61] mt-4 mx-auto"></span>
        </motion.h2>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          {/* Filter Button (Mobile) */}
          <motion.button className="sm:hidden px-4 py-2 bg-[#FF6F61] rounded-lg flex items-center gap-2" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <FilterIcon size={16} />
            Filter: {selectedCategory}
          </motion.button>
          {/* Categories (Desktop) */}
          <motion.div className="hidden sm:flex flex-wrap justify-center gap-4" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            {categories.map(category => <motion.button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-2 rounded-full transition-all duration-300 
                  ${selectedCategory === category ? 'bg-[#FF6F61] text-white' : 'bg-[#1F2A44] text-gray-300 hover:bg-[#FF6F61]/20'}`} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
                {category}
              </motion.button>)}
          </motion.div>
          {/* Layout Toggle */}
          <div className="flex gap-2">
            <motion.button className={`p-2 rounded-lg ${layout === 'grid' ? 'bg-[#FF6F61]' : 'bg-[#1F2A44]'}`} onClick={() => setLayout('grid')} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
              <GridIcon size={20} />
            </motion.button>
            <motion.button className={`p-2 rounded-lg ${layout === 'columns' ? 'bg-[#FF6F61]' : 'bg-[#1F2A44]'}`} onClick={() => setLayout('columns')} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
              <ColumnsIcon size={20} />
            </motion.button>
          </div>
        </div>
        {/* Mobile Filter Menu */}
        <AnimatePresence>
          {isFilterOpen && <motion.div className="sm:hidden mb-8" initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }}>
              <div className="flex flex-col gap-2">
                {categories.map(category => <motion.button key={category} onClick={() => {
              setSelectedCategory(category);
              setIsFilterOpen(false);
            }} className={`px-4 py-2 rounded-lg transition-all duration-300
                      ${selectedCategory === category ? 'bg-[#FF6F61] text-white' : 'bg-[#1F2A44] text-gray-300'}`}>
                    {category}
                  </motion.button>)}
              </div>
            </motion.div>}
        </AnimatePresence>
        {/* Gallery Grid */}
        <motion.div ref={ref} className={`grid gap-8 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={{
        hidden: {
          opacity: 0
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}>
          {filteredImages.map((item, index) => <GalleryCard key={item.id} item={item} onClick={() => setSelectedImage(item)} layout={layout} index={index} />)}
        </motion.div>
        {/* Empty State */}
        {filteredImages.length === 0 && <motion.div className="text-center py-12" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }}>
            <p className="text-gray-400">No items found in this category.</p>
          </motion.div>}
        {/* Modal */}
        {selectedImage && <GalleryModal image={selectedImage} onClose={() => setSelectedImage(null)} images={filteredImages} onNext={() => {
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[nextIndex]);
      }} onPrev={() => {
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[prevIndex]);
      }} />}
      </div>
    </section>;
};
export default Gallery;