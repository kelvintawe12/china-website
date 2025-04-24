import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, TagIcon, SearchIcon } from 'lucide-react';
const blogPosts = [{
  id: 1,
  title: 'The Future of Insurance in Africa',
  excerpt: 'Exploring emerging trends and opportunities in the African insurance market...',
  content: 'Full article content here...',
  date: '2024-03-15',
  readTime: '5 min read',
  category: 'Insurance',
  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
  featured: true
}, {
  id: 2,
  title: 'Building Customer Relations in the Digital Age',
  excerpt: 'How to maintain personal connections while leveraging digital tools...',
  content: 'Full article content here...',
  date: '2024-03-10',
  readTime: '4 min read',
  category: 'Business',
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80'
}
// Add more blog posts as needed
];
const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Insurance', 'Business', 'Technology', 'Leadership'];
  const filteredPosts = blogPosts.filter(post => (selectedCategory === 'All' || post.category === selectedCategory) && (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())));
  return <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }}>
          Blog & Insights
          <span className="block w-20 h-1 bg-[#FF6F61] mt-4 mx-auto"></span>
        </motion.h1>
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-72">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-[#1a2436] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => <motion.button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm
                    ${selectedCategory === category ? 'bg-[#FF6F61] text-white' : 'bg-[#1a2436] text-gray-300 hover:bg-[#FF6F61]/20'}`} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  {category}
                </motion.button>)}
            </div>
          </div>
        </div>
        {/* Featured Post */}
        {filteredPosts.filter(p => p.featured).map(post => <motion.article key={post.id} className="mb-16" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
              <div className="grid md:grid-cols-2 gap-8 bg-[#1a2436] rounded-xl overflow-hidden">
                <div className="relative aspect-video md:aspect-auto">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FF6F61] text-white px-3 py-1 rounded-full text-sm">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={16} />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon size={16} />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                  <p className="text-gray-300 mb-6">{post.excerpt}</p>
                  <motion.button className="bg-[#FF6F61] text-white px-6 py-2 rounded-lg" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                    Read More
                  </motion.button>
                </div>
              </div>
            </motion.article>)}
        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(p => !p.featured).map(post => <motion.article key={post.id} className="bg-[#1a2436] rounded-xl overflow-hidden shadow-lg" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} whileHover={{
          y: -5
        }}>
                <div className="aspect-video relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#1F2A44]/90 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={14} />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                  <motion.button className="text-[#FF6F61] hover:text-white" whileHover={{
              x: 5
            }}>
                    Read More
                  </motion.button>
                </div>
              </motion.article>)}
        </div>
      </div>
    </section>;
};
export default BlogPage;