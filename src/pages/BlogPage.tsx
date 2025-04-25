import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Tag, Search, Share2, ArrowUp } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from './ErrorBoundary';
import violaData from '../data/viola-data.json';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
}

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const postsPerPage = 6;

  // Dynamic categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      violaData.blogPosts
        .filter((post): post is BlogPost => post.featured !== undefined)
        .map((post: BlogPost) => post.category)
    );
    return ['All', ...Array.from(uniqueCategories)];
  }, []);

  // Debounced search
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeout(() => setSearchTerm(value), 300);
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return violaData.blogPosts.filter(
      (post): post is BlogPost =>
        post.featured !== undefined &&
        (selectedCategory === 'All' || post.category === selectedCategory) &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          DOMPurify.sanitize(post.excerpt).toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, selectedCategory]);

  // Paginated posts
  const paginatedPosts = filteredPosts.slice(0, page * postsPerPage);

  // Back to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Share post
  const sharePost = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="py-20 px-4 text-center text-white">
          Failed to load blog posts. Please try again later.
        </div>
      }
    >
      <Helmet>
        <title>Viola China | Blog & Insights</title>
        <meta
          name="description"
          content="Explore Viola China's insights on insurance, business, and leadership."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Viola China Blog',
            description: 'Insights on insurance, business, and leadership by Viola China.',
            blogPost: violaData.blogPosts
              .filter((post): post is BlogPost => post.featured !== undefined)
              .map((post: BlogPost) => ({
                '@type': 'BlogPosting',
                headline: post.title,
                description: post.excerpt,
                datePublished: post.date,
                image: post.image,
              })),
          })}
        </script>
      </Helmet>
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Blog & Insights
            <span className="block w-20 h-1 bg-coral-500 mt-4 mx-auto" />
          </motion.h1>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 bg-navy-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 text-white placeholder-gray-400"
                  aria-label="Search blog articles"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCategory === category
                        ? 'bg-coral-500 text-white'
                        : 'bg-navy-900 text-gray-300 hover:bg-coral-500/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-pressed={selectedCategory === category}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Post */}
          <div className="space-y-16">
            {paginatedPosts.filter((p: BlogPost) => p.featured).map((post: BlogPost) => (
              <motion.article
                key={post.id}
                className="bg-navy-900 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative aspect-video md:aspect-auto">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2 }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-coral-500 text-white px-3 py-1 rounded-full text-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag size={16} />
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-white">{post.title}</h2>
                      <div
                        className="text-gray-300 mb-6"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(post.excerpt, {
                            ADD_TAGS: ['b', 'a'],
                            ADD_ATTR: ['href'],
                          }),
                        }}
                      />
                    </div>
                    <div className="flex gap-4">
                      <motion.button
                        className="bg-coral-500 text-white px-6 py-2 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read More
                      </motion.button>
                      <motion.button
                        onClick={() => sharePost(post)}
                        className="p-2 bg-navy-800 rounded-lg text-white hover:bg-coral-500"
                        whileHover={{ scale: 1.1 }}
                        aria-label="Share this post"
                      >
                        <Share2 size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {paginatedPosts
              .filter((p: BlogPost) => !p.featured)
              .map((post: BlogPost, index: number) => (
                <motion.article
                  key={post.id}
                  className="bg-navy-900 rounded-xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(255, 111, 97, 0.3)' }}
                >
                  <div className="aspect-video relative">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2 }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-navy-800/90 text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
                    <div
                      className="text-gray-300 text-sm mb-4"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.excerpt, {
                          ADD_TAGS: ['b', 'a'],
                          ADD_ATTR: ['href'],
                        }),
                      }}
                    />
                    <div className="flex gap-4">
                      <motion.button
                        className="text-coral-500 hover:text-white"
                        whileHover={{ x: 5 }}
                      >
                        Read More
                      </motion.button>
                      <motion.button
                        onClick={() => sharePost(post)}
                        className="p-2 bg-navy-800 rounded-lg text-white hover:bg-coral-500"
                        whileHover={{ scale: 1.1 }}
                        aria-label="Share this post"
                      >
                        <Share2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>

          {/* Load More */}
          {paginatedPosts.length < filteredPosts.length && (
            <motion.button
              onClick={() => setPage((prev) => prev + 1)}
              className="mt-12 mx-auto block bg-coral-500 text-white px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More
            </motion.button>
          )}

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

export default React.memo(BlogPage);