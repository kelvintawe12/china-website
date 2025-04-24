
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import violaData from '../../data/viola-data.json';

interface Message {
  id: number;
  text: string;
  isAi: boolean;
  timestamp: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            text: "Hi! I'm Viola's virtual assistant. Ask about her experience, projects, or skills!",
            isAi: true,
            timestamp: new Date().toLocaleTimeString(),
          },
        ];
  });
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [aiStatus, setAiStatus] = useState<'online' | 'loading'>('online');
  const [suggestions, setSuggestions] = useState<string[]>([
    'What is Viola’s experience?',
    'Tell me about her essay award',
    'What are Viola’s skills?',
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Save chat history
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Handle Esc key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Simulate AI response
  const getAiResponse = (query: string): string => {
    const cleanQuery = DOMPurify.sanitize(query.toLowerCase());
    if (cleanQuery.includes('experience')) {
      return 'Viola has <b>four years</b> of experience in sales, including roles at <a href="#timeline" class="underline text-white">Icea Lion Group</a> and Multi-Choice. She specializes in insurance and customer relationship management.';
    }
    if (cleanQuery.includes('award') || cleanQuery.includes('essay')) {
      return 'In 2024, Viola was <b>second runner-up</b> in the <a href="#projects" class="underline text-white">Africa Essay Competition</a> in Namibia, organized by Young Insurance Professionals.';
    }
    if (cleanQuery.includes('skill')) {
      return `Viola’s key skills include: <ul><li>Communication</li><li>Customer Service</li><li>Sales</li><li>Multilingual (English, Luganda, Arabic)</li></ul> See more at <a href="#skills" class="underline text-white">Skills</a>.`;
    }
    if (cleanQuery.includes('project')) {
      return 'Viola’s notable projects include her award-winning essay in the 2024 Africa Essay Competition. Check out her <a href="#projects" class="underline text-white">Projects</a> section for more!';
    }
    if (cleanQuery.includes('contact')) {
      return 'Reach Viola at <a href="mailto:chinavioliny@gmail.com" class="underline text-white">chinavioliny@gmail.com</a> or <a href="tel:+256123456789" class="underline text-white">+256-123-456-789</a>.';
    }
    if (cleanQuery.includes('event') || cleanQuery.includes('gallery')) {
      return 'Viola has attended events like the Africa Essay Competition in Namibia and insurance summits. Explore her <a href="#gallery" class="underline text-white">Gallery</a> for photos!';
    }
    return 'I’d be happy to tell you about Viola’s experience, skills, projects, or events. Try asking something specific!';
  };

  // Update suggestions based on query
  const updateSuggestions = (query: string) => {
    const cleanQuery = query.toLowerCase();
    if (cleanQuery.includes('experience')) {
      setSuggestions([
        'Tell me about her role at Icea Lion Group',
        'What skills does Viola use in sales?',
        'What’s her background in insurance?',
      ]);
    } else if (cleanQuery.includes('award') || cleanQuery.includes('essay')) {
      setSuggestions([
        'What was the essay topic?',
        'Are there other awards Viola won?',
        'What’s in her Projects section?',
      ]);
    } else {
      setSuggestions([
        'What is Viola’s experience?',
        'Tell me about her essay award',
        'What are Viola’s skills?',
      ]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a message.');
      return;
    }
    if (input.length > 500) {
      setError('Message must be under 500 characters.');
      return;
    }
    setError('');
    const userMessage: Message = {
      id: messages.length + 1,
      text: DOMPurify.sanitize(input),
      isAi: false,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setAiStatus('loading');
    updateSuggestions(input);
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAiResponse(userMessage.text),
        isAi: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setAiStatus('online');
    }, 1000);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setError('');
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: 'Chat cleared! Ask about Viola’s experience, projects, or skills!',
        isAi: true,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    localStorage.removeItem('chatHistory');
    setSuggestions([
      'What is Viola’s experience?',
      'Tell me about her essay award',
      'What are Viola’s skills?',
    ]);
  };

  return (
    <motion.div
      ref={chatWindowRef}
      className="fixed bottom-24 right-6 w-[400px] max-w-[calc(100vw-24px)] bg-navy-800 rounded-lg shadow-xl overflow-hidden z-50 sm:p-2"
      initial={{ opacity: 0, y: 100, rotateX: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, rotateX: 10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      role="dialog"
      aria-label="Chat with Viola’s Assistant"
    >
      {/* Header */}
      <div className="bg-coral-500 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-white">Chat with Viola’s Assistant</h3>
          <motion.div
            className={`w-2 h-2 rounded-full ${aiStatus === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          className="text-white/70 hover:text-white"
          aria-label="Close chat"
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-navy-800" aria-live="polite">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
            initial={{ opacity: 0, x: message.isAi ? -20 : 20 }}
            animate={{ opacity: 1, x: 0, boxShadow: message.isAi ? '0 0 10px rgba(72, 187, 120, 0.3)' : '0 0 10px rgba(255, 111, 97, 0.3)' }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -2 }}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isAi ? 'bg-emerald-500 text-white' : 'bg-coral-500 text-white'
              }`}
            >
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(message.text, {
                    ADD_TAGS: ['a', 'b', 'ul', 'li'],
                    ADD_ATTR: ['href', 'class'],
                  }),
                }}
              />
              <span className="text-xs text-white/70 mt-1 block">{message.timestamp}</span>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            className="px-4 pb-2 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {suggestions.map((suggestion, i) => (
              <motion.button
                key={i}
                className="px-3 py-1 bg-navy-900 text-white rounded-full text-sm hover:bg-coral-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSuggestionClick(suggestion)}
                aria-label={`Ask: ${suggestion}`}
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-navy-700">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInput(e.target.value);
                setError('');
              }}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-navy-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 text-white placeholder-gray-400"
              aria-label="Type your message"
              maxLength={500}
            />
            <motion.button
              type="submit"
              className="p-2 bg-coral-500 rounded-lg"
              whileHover={{ scale: 1.05, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent)' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Send message"
              disabled={aiStatus !== 'online'}
            >
              <Send size={20} />
            </motion.button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>

      {/* Footer */}
      <div className="p-2 flex justify-between items-center text-sm text-gray-400 bg-navy-900">
        <span>Powered by AI</span>
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
  );
};

export default ChatWindow;