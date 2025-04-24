import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleIcon, XIcon, MinimizeIcon } from 'lucide-react';
import ChatWindow from './ChatWindow';
const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProactive, setShowProactive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowProactive(true);
        setTimeout(() => setShowProactive(false), 5000);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [isOpen]);
  const handleNewMessage = () => {
    if (!isOpen || isMinimized) {
      setUnreadCount(prev => prev + 1);
    }
  };
  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  };
  return <>
      <motion.div className="fixed bottom-6 right-6 z-50" initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      type: 'spring',
      stiffness: 260,
      damping: 20
    }}>
        {/* Proactive Message */}
        <AnimatePresence>
          {showProactive && !isOpen && <motion.div className="absolute bottom-full mb-4 right-0 bg-white text-gray-800 rounded-lg p-3 shadow-lg max-w-xs" initial={{
          opacity: 0,
          y: 10,
          scale: 0.95
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          y: 10,
          scale: 0.95
        }} transition={{
          duration: 0.2
        }}>
              <p className="text-sm">Want to learn about Viola's expertise?</p>
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white" />
            </motion.div>}
        </AnimatePresence>
        {/* Unread Count Badge */}
        <AnimatePresence>
          {unreadCount > 0 && <motion.div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} exit={{
          scale: 0
        }}>
              {unreadCount}
            </motion.div>}
        </AnimatePresence>
        {/* Chat Button */}
        <motion.button className="bg-[#FF6F61] text-white p-4 rounded-full shadow-lg hover:bg-[#FF6F61]/90" whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.95
      }} onClick={handleOpen} animate={isOpen ? {
        scale: 0
      } : {
        scale: [1, 1.1, 1],
        transition: {
          repeat: Infinity,
          repeatDelay: 10,
          duration: 1
        }
      }}>
          <MessageCircleIcon size={24} />
        </motion.button>
      </motion.div>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} onMinimize={() => setIsMinimized(true)} isMinimized={isMinimized} onNewMessage={handleNewMessage} />}
      </AnimatePresence>
      {/* Minimized Chat Window */}
      <AnimatePresence>
        {isMinimized && <motion.div className="fixed bottom-6 right-6 bg-[#FF6F61] text-white px-4 py-2 rounded-full shadow-lg cursor-pointer z-50" initial={{
        y: 50,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} exit={{
        y: 50,
        opacity: 0
      }} onClick={() => setIsMinimized(false)}>
            <div className="flex items-center gap-2">
              <MessageCircleIcon size={20} />
              <span className="text-sm font-medium">Resume Chat</span>
              {unreadCount > 0 && <span className="bg-white text-[#FF6F61] text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>}
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default ChatBubble;