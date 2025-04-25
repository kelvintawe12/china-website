// Project: viola-china
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, Share2, Download, ArrowUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from './ErrorBoundary';
import violaData from '../data/viola-data.json';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  year: number;
  event: string;
  caption: string;
}

// Fallback data if viola-data.json is missing or malformed
const fallbackGallery: GalleryItem[] = [
  {
    id: 1,
    title: 'Placeholder Event',
    image: 'https://via.placeholder.com/800x600',
    year: 2024,
    event: 'General',
    caption: 'Placeholder image for gallery',
  },
];

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Validate and use gallery data
  const galleryData = useMemo(() => {
    try {
      if (Array.isArray(violaData.gallery) && violaData.gallery.length > 0) {
        return violaData.gallery as GalleryItem[];
      }
      console.warn('Invalid or empty gallery data, using fallback');
      return fallbackGallery;
    } catch (error) {
      console.error('Failed to load gallery data:', error);
      return fallbackGallery;
    }
  }, []);

  // Dynamic years
  const years = useMemo(() => {
    const uniqueYears = new Set(galleryData.map((item: GalleryItem) => item.year.toString()));
    return ['All', ...Array.from(uniqueYears).sort((a, b) => Number(b) - Number(a))];
  }, [galleryData]);

  // Filtered gallery
  const filteredGallery = useMemo(() => {
    return galleryData.filter(
      (item: GalleryItem) => selectedYear === 'All' || item.year.toString() === selectedYear
    );
  }, [galleryData, selectedYear]);

  // Back to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Share image
  const shareImage = useCallback((item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.caption,
        url: item.image,
      });
    }
  }, []);

  // Close lightbox on Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [selectedImage]);

  return (
    <ErrorBoundary
      fallback={
        <div className="py-20 px-4 text-center text-white bg-navy-900">
          Failed to load gallery. Please try again later.
        </div>
      }
    >
      <Helmet>
        <title>Viola China | Gallery</title>
        <meta name="description" content="View photos from Viola China's events and achievements." />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Viola China Gallery',
            description: 'Photos from events and achievements by Viola China.',
            image: galleryData.map((item: GalleryItem) => ({
              '@type': 'ImageObject',
              name: item.title,
              description: item.caption,
              contentUrl: item.image,
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
            Gallery
            <span className="block w-20 h-1 bg-coral-500 mt-4 mx-auto" />
          </motion.h1>

          {/* Year Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedYear === year
                    ? 'bg-coral-500 text-white'
                    : 'bg-navy-800 text-gray-300 hover:bg-coral-500/20'
                }`}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 10px rgba(255, 111, 97, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={selectedYear === year}
              >
                {year}
              </motion.button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {filteredGallery.map((item: GalleryItem, index: number) => (
              <motion.div
                key={item.id}
                className="mb-6 break-inside-avoid relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 120 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 10px 20px rgba(255, 111, 97, 0.3)',
                }}
                onClick={() => setSelectedImage(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedImage(item);
                  }
                }}
                aria-label={`View ${item.title}`}
              >
                <motion.img
                  src={item.image}
                  alt={item.caption}
                  className="w-full object-cover"
                  loading="lazy"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2 }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy-900/80 p-4">
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.caption}</p>
                  <div className="flex gap-2 mt-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        shareImage(item);
                      }}
                      className="p-2 bg-navy-800 rounded-lg text-white hover:bg-coral-500"
                      whileHover={{ scale: 1.1 }}
                      aria-label={`Share ${item.title}`}
                    >
                      <Share2 size={16} />
                    </motion.button>
                    <motion.a
                      href={item.image}
                      download
                      className="p-2 bg-navy-800 rounded-lg text-white hover:bg-coral-500"
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Download ${item.title}`}
                    >
                      <Download size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                role="dialog"
                aria-modal="true"
                aria-label="Image lightbox"
              >
                <motion.div
                  className="relative max-w-5xl w-full p-4 sm:p-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.caption}
                    className="w-full rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-navy-900/80 p-4 sm:p-6 rounded-lg">
                    <h3 className="text-white font-bold text-lg">{selectedImage.title}</h3>
                    <p className="text-gray-300">{selectedImage.caption}</p>
                    <div className="flex gap-4 mt-4">
                      <motion.button
                        onClick={() => shareImage(selectedImage)}
                        className="p-2 bg-navy-800 rounded-lg text-white hover:bg-coral-500"
                        whileHover={{ scale: 1.1 }}
                        aria-label={`Share ${selectedImage.title}`}
                      >
                        <Share2 size={20} />
                      </motion.button>
                      <motion.a
                        href={selectedImage.image}
                        download
                        className="p-2 bg-navy-800 rounded-lg text-white hover:bg-coral-500"
                        whileHover={{ scale: 1.1 }}
                        aria-label={`Download ${selectedImage.title}`}
                      >
                        <Download size={20} />
                      </motion.a>
                    </div>
                  </div>
                  <motion.button
                    className="absolute top-4 right-4 bg-coral-500 text-white p-2 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    onClick={() => setSelectedImage(null)}
                    aria-label="Close lightbox"
                    autoFocus
                  >
                    <X size={24} />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

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

export default React.memo(GalleryPage);