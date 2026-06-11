'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import InteractivePlotMap from '@/components/InteractivePlotMap';
import ParcelModal from '@/components/ParcelModal';
import { projectsData } from '@/data/projects';

const projectKeys = Object.keys(projectsData);

export default function ProjectsPage() {
  const [selectedProjectKey, setSelectedProjectKey] = useState(projectKeys[0]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const currentProject = projectsData[selectedProjectKey];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gradient-to-b from-pearl to-white">
        <div className="royal-container">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl text-text-dark mb-4">Our Featured Projects</h1>
            <p className="text-text-mid max-w-2xl">
              Explore our landmark developments with interactive plot maps
            </p>
          </motion.div>

          {/* Project Tabs */}
          <motion.div
            className="flex gap-3 mb-12 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {projectKeys.map((key) => (
              <motion.button
                key={key}
                onClick={() => setSelectedProjectKey(key)}
                className={`px-6 py-3 rounded-full font-label tracking-wider transition-all ${
                  selectedProjectKey === key
                    ? 'bg-gradient-royal text-white border border-gold-bright'
                    : 'bg-white text-text-dark border border-silver hover:border-gold-bright'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {projectsData[key].title}
              </motion.button>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedProjectKey}
          >
            {/* Left Panel - Project Info */}
            <motion.div className="space-y-6" variants={itemVariants}>
              {/* Project Title & Location */}
              <div className="royal-card p-6">
                <motion.h2 className="font-heading text-4xl text-text-dark mb-2">
                  {currentProject.title}
                </motion.h2>
                <p className="text-text-light flex items-center gap-2 mb-4">
                  📍 {currentProject.location}
                </p>
                <p className="text-text-mid font-ui leading-relaxed">
                  {currentProject.longDescription}
                </p>
              </div>

              {/* Status & Counts */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div className="royal-card p-4 text-center" variants={itemVariants}>
                  <p className="font-label text-gold-bright text-sm mb-2">AVAILABLE</p>
                  <p className="font-heading text-3xl text-green-600">
                    {currentProject.availablePlots}
                  </p>
                </motion.div>
                <motion.div className="royal-card p-4 text-center" variants={itemVariants}>
                  <p className="font-label text-gold-bright text-sm mb-2">SOLD</p>
                  <p className="font-heading text-3xl text-red-600">
                    {currentProject.soldPlots}
                  </p>
                </motion.div>
              </div>

              {/* Amenities */}
              <motion.div className="royal-card p-6" variants={itemVariants}>
                <h3 className="font-heading text-xl text-text-dark mb-4">Amenities</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-text-mid font-ui">
                    <span className="text-green-600 text-xl">✓</span>
                    Gazebo & Senior Citizen Park
                  </li>
                  <li className="flex items-center gap-3 text-text-mid font-ui">
                    <span className="text-green-600 text-xl">✓</span>
                    Joggers Park & Children Park
                  </li>
                  <li className="flex items-center gap-3 text-text-mid font-ui">
                    <span className="text-green-600 text-xl">✓</span>
                    CCTV Camera & Security Cabin
                  </li>
                  <li className="flex items-center gap-3 text-text-mid font-ui">
                    <span className="text-green-600 text-xl">✓</span>
                    Underground Water & Electricity
                  </li>
                </ul>
              </motion.div>

              {/* CTA */}
              <motion.a
                href={`https://wa.me/917208324505?text=Hi, I'm interested in ${currentProject.title} project. Please provide more details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-royal block text-center py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                Enquire on WhatsApp
              </motion.a>
            </motion.div>

            {/* Right Panel - Interactive Map */}
            <motion.div variants={itemVariants}>
              <InteractivePlotMap
                parcels={currentProject.parcels}
                onSelectParcel={setSelectedParcel}
              />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Parcel Modal */}
      <ParcelModal isOpen={!!selectedParcel} parcel={selectedParcel} onClose={() => setSelectedParcel(null)} />

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/917208324505?text=Hello A New Era Developers, I'm interested in your projects."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
      >
        💬
      </motion.a>

      <Footer />
    </PageTransition>
  );
}
