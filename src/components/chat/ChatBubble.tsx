import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize, Trash2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import violaData from '../../data/viola-data.json';

// Mock transformers.js import (replace with actual import in production)
interface QueryAIResponse {
  (input: string): Promise<string>;
}

const queryAI: QueryAIResponse = async (input) => {
  try {
    const cleanInput: string = DOMPurify.sanitize(input.toLowerCase());
    if (cleanInput.includes('experience')) {
      return 'Viola has <b>four years</b> of experience in sales, including roles at <a href="#timeline" class="underline text-coral-500">Icea Lion Group</a> and Multi-Choice. Want details on a specific role?';
    } else if (cleanInput.includes('essay award')) {
      return 'In 2024, Viola was <b>second runner-up</b> in the <a href="#projects" class="underline text-coral-500">Africa Essay Competition</a> in Namibia, showcasing her thought leadership in insurance. Want to know about the essay topic?';
    } else if (cleanInput.includes('skills')) {
      return `Viola’s skills include: <ul><li>Communication</li><li>Customer Service</li><li>Sales</li><li>Multilingual (English, Luganda, Arabic)</li></ul> See more at <a href="#skills" class="underline text-coral-500">Skills</a>.`;
    } else if (cleanInput.includes('contact')) {
      return 'You can reach Viola at <a href="mailto:chinavioliny@gmail.com" class="underline text-coral-500">chinavioliny@gmail.com</a> or <a href="tel:+256123456789" class="underline text-coral-500">+256-123-456-789</a>.';
    } else {
      return 'I don’t have details on that. Try asking about Viola’s skills, projects, or contact her at <a href="mailto:chinavioliny@gmail.com" class="underline text-coral-500">chinavioliny@gmail.com</a>!';
    }
  } catch (error) {
    return 'Oops, I’m having trouble processing that. Try again or ask about Viola’s experience!';
  }
};

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [
      { sender: 'ai', text: 'Hi! I’m Viola’s virtual assistant. Ask about her experience, projects, or skills!', timestamp: new Date().toISOString() }
    ];
  });
  const [input, setInput] = useState('');
  const [showProactive, setShowProactive] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [aiStatus, setAiStatus] = useState('online'); // online, offline, loading
  const [proactiveMessage, setProactiveMessage] = useState('Want to learn about Viola’s expertise? Ask me!');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Proactive message rotation based on section
  const proactiveMessages = [
    { trigger: 'default', text: 'Want to learn about Viola’s expertise? Ask me!' },
    { trigger: 'projects', text: 'Noticed you’re on the Projects section! Want details on Viola’s essay award?' },
    { trigger: 'gallery', text: 'Exploring the Gallery? Ask about Viola’s events, like the Africa Essay Competition!' },
    { trigger: 'contact', text: 'Ready to connect? Ask how to book a consultation with Viola!' }
  ];

  // Scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  // Proactive message trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !isMinimized) {
        // Determine current section (simplified; use IntersectionObserver in production)
        const section = window.location.hash.replace('#', '') || 'default';
        const message = proactiveMessages.find(m => m.trigger === section) || proactiveMessages[0];
        setProactiveMessage(message.text);
        setShowProactive(true);
        setTimeout(() => setShowProactive(false), 5000);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [isOpen, isMinimized]);

  // Unread count for new messages
  useEffect(() => {
    if (!isOpen || isMinimized) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'ai') setUnreadCount(prev => prev + 1);
    }
  }, [messages, isOpen, isMinimized]);

  // Simulate AI loading (replace with actual transformers.js loading)
  useEffect(() => {
    setAiStatus('loading');
    setTimeout(() => setAiStatus('online'), 2000); // Mock AI model load
  }, []);

  // Handle message submission with debounce
  const handleSend = async () => {
    if (!input.trim() || input.length > 500) {
      setMessages((prev: Message[]) => [...prev, {
        sender: 'ai',
        text: input.length > 500 ? 'Please keep your message under 500 characters.' : 'Please enter a valid question.',
        timestamp: new Date().toISOString()
      }]);
      return;
    }
    const sanitizedInput = DOMPurify.sanitize(input);
    setMessages((prev: Message[]) => [...prev, { sender: 'user', text: sanitizedInput, timestamp: new Date().toISOString() }]);
    setInput('');
    setAiStatus('loading');
    const aiResponse = await queryAI(sanitizedInput);
    setMessages((prev: Message[]) => [...prev, { sender: 'ai', text: aiResponse, timestamp: new Date().toISOString() }]);
    setAiStatus('online');
    // Optional sound effect (uncomment to enable)
    // new Audio('/message.mp3').play();
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([
      { sender: 'ai', text: 'Chat cleared! Ask about Viola’s experience, projects, or skills!', timestamp: new Date().toISOString() }
    ]);
    localStorage.removeItem('chatHistory');
    setUnreadCount(0);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 group"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: isOpen || isMinimized ? 0 : 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Live chat with Viola’s assistant"
      >
        {/* Proactive Message */}
        <AnimatePresence>
          {showProactive && !isOpen && !isMinimized && (
            <motion.div
              className="absolute bottom-full mb-4 right-0 bg-navy-800 text-white rounded-lg p-3 shadow-lg max-w-xs cursor-pointer"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={handleOpen}
            >
              <p className="text-sm">{proactiveMessage}</p>
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-navy-800" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread Count Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              {unreadCount}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Dot */}
        <motion.div
          className={`absolute top-0 right-0 w-3 h-3 rounded-full ${aiStatus === 'online' ? 'bg-green-500' : aiStatus === 'loading' ? 'bg-yellow-500' : 'bg-red-500'}`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />

        {/* Chat Button */}
        <motion.button
          className="bg-coral-500 text-white p-4 rounded-full shadow-lg relative"
          whileHover={{ scale: 1.2, boxShadow: '0 0 15px rgba(255, 111, 97, 0.5)', rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          animate={{ scale: [1, 1.1, 1], transition: { repeat: Infinity, repeatDelay: 10, duration: 1 } }}
          aria-label="Open live chat to ask about Viola"
        >
          <MessageCircle size={24} />
          <span className="absolute hidden group-hover:block bg-navy-900 text-white text-sm p-2 rounded-lg -top-12 right-0 whitespace-nowrap">
            Ask about Viola!
          </span>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 md:w-96 bg-navy-800 rounded-lg shadow-xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: 100, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: 100, rotateX: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-label="Chat with Viola’s Assistant"
          >
            {/* Header */}
            <div className="bg-navy-900 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Viola’s Assistant</h3>
                <motion.div
                  className={`w-2 h-2 rounded-full ${aiStatus === 'online' ? 'bg-green-500' : aiStatus === 'loading' ? 'bg-yellow-500' : 'bg-red-500'}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ rotate: 90, color: '#FF6F61' }}
                  onClick={() => setIsMinimized(true)}
                  aria-label="Minimize chat"
                >
                  <Minimize size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ rotate: 90, color: '#FF6F61' }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-80 overflow-y-auto bg-navy-800">
                {messages.map((msg: Message, i: number) => (
                <motion.div
                  key={i}
                  className={`mb-4 p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-coral-500 ml-auto' : 'bg-emerald-500'}`}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2, boxShadow: `0 2px 5px ${msg.sender === 'user' ? 'rgba(255, 111, 97, 0.3)' : 'rgba(72, 187, 120, 0.3)'}` }}
                >
                  <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.text, { ADD_TAGS: ['a', 'b', 'ul', 'li'], ADD_ATTR: ['href', 'class'] }) }}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </motion.div>
                ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-navy-700 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your question…"
                className="flex-1 bg-navy-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 text-white placeholder-gray-400"
                aria-label="Type your question"
                maxLength={500}
              />
              <motion.button
                whileHover={{ scale: 1.1, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent)' }}
                onClick={handleSend}
                className="bg-coral-500 p-2 rounded-lg"
                aria-label="Send message"
                disabled={aiStatus !== 'online'}
              >
                <Send size={20} />
              </motion.button>
            </div>

            {/* Footer */}
            <div className="p-2 flex justify-between items-center text-sm text-gray-400 bg-navy-900">
              <div className="group relative">
                Powered by AI
                <span className="absolute hidden group-hover:block bg-navy-900 text-white text-xs p-2 rounded-lg -top-8 left-1/2 transform -translate-x-1/2">
                  Built with cutting-edge AI
                </span>
              </div>
              <motion.button
                className="text-gray-400 hover:text-coral-500"
                whileHover={{ scale: 1.1 }}
                onClick={handleClearChat}
                aria-label="Clear chat history"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Chat */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            className="fixed bottom-6 right-6 bg-coral-500 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer z-50"
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsMinimized(false)}
            aria-label="Resume chat"
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="text-sm font-medium">Resume Chat</span>
              {unreadCount > 0 && (
                <span className="bg-white text-coral-500 text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;