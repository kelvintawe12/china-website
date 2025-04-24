import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { XIcon, SendIcon } from 'lucide-react';
interface Message {
  id: number;
  text: string;
  isAi: boolean;
  timestamp: string;
}
const ChatWindow: React.FC<{
  onClose: () => void;
}> = ({
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: "Hi! I'm Viola's virtual assistant. Ask about her experience, projects, or skills!",
    isAi: true,
    timestamp: new Date().toLocaleTimeString()
  }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(scrollToBottom, [messages]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isAi: false,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAiResponse(input),
        isAi: true,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  const getAiResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    if (lowercaseQuery.includes('experience')) {
      return 'Viola has 4 years of experience in sales, including roles at Icea Lion Group and Multi-Choice. She specializes in insurance and customer relationship management.';
    }
    if (lowercaseQuery.includes('award') || lowercaseQuery.includes('essay')) {
      return 'In 2024, Viola was awarded second runner-up in the Africa-wide Essay Competition organized by Young Insurance Professionals in Namibia.';
    }
    if (lowercaseQuery.includes('skill')) {
      return "Viola's key skills include communication, customer service, sales, and relationship building. She's also active in Toastmasters to enhance her public speaking abilities.";
    }
    return "I'd be happy to tell you about Viola's experience, skills, or achievements. What would you like to know?";
  };
  return <motion.div className="fixed bottom-24 right-6 w-[400px] max-w-[calc(100vw-48px)] bg-[#1F2A44] rounded-lg shadow-xl overflow-hidden z-50" initial={{
    opacity: 0,
    y: 100,
    scale: 0.95
  }} animate={{
    opacity: 1,
    y: 0,
    scale: 1
  }} exit={{
    opacity: 0,
    y: 100,
    scale: 0.95
  }} transition={{
    duration: 0.3
  }}>
      {/* Header */}
      <div className="bg-[#FF6F61] p-4 flex justify-between items-center">
        <h3 className="font-bold">Chat with Viola's Assistant</h3>
        <motion.button onClick={onClose} whileHover={{
        scale: 1.1,
        rotate: 90
      }} className="text-white/70 hover:text-white">
          <XIcon size={20} />
        </motion.button>
      </div>
      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map(message => <motion.div key={message.id} className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`} initial={{
        opacity: 0,
        x: message.isAi ? -20 : 20
      }} animate={{
        opacity: 1,
        x: 0
      }}>
            <div className={`max-w-[80%] p-3 rounded-lg ${message.isAi ? 'bg-[#48BB78] text-white' : 'bg-[#FF6F61] text-white'}`}>
              <p className="text-sm">{message.text}</p>
              <span className="text-xs text-white/70 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </motion.div>)}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-2 bg-[#2D3748] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" />
          <motion.button type="submit" className="p-2 bg-[#FF6F61] rounded-lg" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <SendIcon size={20} />
          </motion.button>
        </div>
      </form>
    </motion.div>;
};
export default ChatWindow;