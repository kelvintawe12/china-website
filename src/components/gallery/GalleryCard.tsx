import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, TagIcon } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
  layout: 'grid' | 'columns';
  index: number;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick, layout, index }) => {
  return (
    <motion.div
      className={`gallery-card relative group cursor-pointer overflow-hidden rounded-lg ${
        layout === 'grid' ? 'grid-style' : 'columns-style'
      }`}
      whileHover={{ y: -5 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      >
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <div className="flex items-center text-sm text-gray-300 mb-2">
            <CalendarIcon size={16} className="mr-2" />
            {item.date}
          </div>
          <div className="flex items-center text-sm text-[#FF6F61]">
            <TagIcon size={16} className="mr-2" />
            {item.category}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GalleryCard;