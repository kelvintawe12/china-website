import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from './ErrorBoundary';
import violaData from '../data/viola-data.json';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: '', email: '', message: '' };
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.message) newErrors.message = 'Message is required';

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="py-20 px-4 text-center text-white">
          Failed to load contact page. Please try again later.
        </div>
      }
    >
      <Helmet>
        <title>Viola China | Contact</title>
        <meta name="description" content="Get in touch with Viola China for consultations or inquiries." />
      </Helmet>
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Me
            <span className="block w-20 h-1 bg-coral-500 mt-4 mx-auto" />
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              className="bg-navy-900 rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-coral-500" size={20} />
                  <a
                    href={`mailto:${violaData.contact.email}`}
                    className="text-gray-300 hover:text-coral-500"
                  >
                    {violaData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-coral-500" size={20} />
                  <a
                    href={`tel:${violaData.contact.phone}`}
                    className="text-gray-300 hover:text-coral-500"
                  >
                    {violaData.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-coral-500" size={20} />
                  <span className="text-gray-300">{violaData.contact.location}</span>
                </div>
                <div className="flex gap-4 mt-6">
                  <a
                    href={violaData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-coral-500"
                    aria-label="Visit Viola’s LinkedIn"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href={violaData.contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-coral-500"
                    aria-label="Visit Viola’s Twitter"
                  >
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
            {/* Contact Form */}
            <motion.div
              className="bg-navy-900 rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Send a Message</h2>
              {submitted ? (
                <motion.p
                  className="text-green-500 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Message sent successfully! I’ll get back to you soon.
                </motion.p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-navy-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 text-white"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-navy-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 text-white"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 bg-navy-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 text-white"
                      rows={4}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-coral-500 text-white px-6 py-3 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={Object.values(formData).some((v) => !v)}
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default React.memo(ContactPage);