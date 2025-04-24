import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
interface GalleryItem {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
}
interface GalleryModalProps {
  image: GalleryItem;
  onClose: () => void;
  images: GalleryItem[];
}
const GalleryModal: React.FC<GalleryModalProps> = ({
  image,
  onClose,
  images
}) => {
  const currentIndex = images.findIndex(img => img.id === image.id);
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    image = images[nextIndex];
  };
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    image = images[prevIndex];
  };
  return <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={onClose}>
        {/* Close button */}
        <motion.button className="absolute top-4 right-4 p-2 text-white/70 hover:text-white" whileHover={{
        scale: 1.2,
        rotate: 90
      }} onClick={onClose}>
          <XIcon size={24} />
        </motion.button>
        {/* Navigation buttons */}
        <motion.button className="absolute left-4 p-4 text-white/70 hover:text-white" whileHover={{
        scale: 1.2
      }} onClick={handlePrev}>
          <ChevronLeftIcon size={32} />
        </motion.button>
        <motion.button className="absolute right-4 p-4 text-white/70 hover:text-white" whileHover={{
        scale: 1.2
      }} onClick={handleNext}>
          <ChevronRightIcon size={32} />
        </motion.button>
        {/* Content */}
        <motion.div className="max-w-4xl w-full" initial={{
        scale: 0.8,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.8,
        opacity: 0
      }} onClick={e => e.stopPropagation()}>
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />
          </div>
          <div className="mt-4 text-white">
            <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
            <p className="text-gray-300 mb-2">{image.description}</p>
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-4">{image.date}</span>
              <span>{image.category}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};
export default GalleryModal;