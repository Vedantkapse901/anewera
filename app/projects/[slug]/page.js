'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ParcelModal from '@/components/ParcelModal';
import { projectsData } from '@/data/projects';

export default function ProjectDetailPage({ params }) {
  const { slug } = use(params);
  const project = projectsData[slug];
  const [selectedParcel, setSelectedParcel] = useState(null);

  if (!project) {
    return (
      <PageTransition>
        <Navbar />
        <main className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl mb-4">Project Not Found</h1>
            <Link href="/projects" className="btn-royal">
              Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Sold':
        return 'bg-red-100 text-red-800';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pre-Launch':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
    hidden: { opacity: 0, y: 20 },
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
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/projects" className="text-gold-bright mb-4 inline-block hover:text-gold">
              ← Back to Projects
            </Link>
            <h1 className="font-heading text-5xl text-text-dark mb-4">{project.title}</h1>
            <p className="text-text-mid text-lg">{project.location}</p>
            <div className="flex gap-4 mt-4 flex-wrap">
              <span className="px-4 py-2 bg-gold-tint text-gold-bright rounded-full font-label text-sm">
                {project.category}
              </span>
              <span className="px-4 py-2 bg-royal-blue-tint text-royal-blue rounded-full font-label text-sm">
                {project.status}
              </span>
            </div>
          </motion.div>

          {/* Project Info Grid */}
          <motion.div
            className="grid md:grid-cols-4 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="royal-card p-6" variants={itemVariants}>
              <p className="text-text-light text-sm font-label">Total Plots</p>
              <p className="font-heading text-3xl text-text-dark mt-2">{project.totalPlots}</p>
            </motion.div>
            <motion.div className="royal-card p-6" variants={itemVariants}>
              <p className="text-text-light text-sm font-label">Price Range</p>
              <p className="font-heading text-2xl text-text-dark mt-2">{project.priceRange}</p>
            </motion.div>
            <motion.div className="royal-card p-6" variants={itemVariants}>
              <p className="text-text-light text-sm font-label">Area Range</p>
              <p className="font-heading text-2xl text-text-dark mt-2">{project.areaRange}</p>
            </motion.div>
            <motion.div className="royal-card p-6" variants={itemVariants}>
              <p className="text-text-light text-sm font-label">Description</p>
              <p className="font-ui text-sm text-text-mid mt-2">{project.longDescription}</p>
            </motion.div>
          </motion.div>

          {/* Project Image */}
          <motion.div
            className="royal-card overflow-hidden mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="relative h-96"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Land Parcels Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl text-text-dark mb-8">Available Land Parcels</h2>

            <motion.div
              className="grid gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {project.parcels.map((parcel, idx) => (
                <motion.div
                  key={parcel.id}
                  className="royal-card p-6 cursor-pointer hover:shadow-hover transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedParcel(parcel)}
                >
                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    {/* Parcel Info */}
                    <div>
                      <p className="font-label text-xs text-gold-bright mb-1">PARCEL ID</p>
                      <h3 className="font-heading text-2xl text-text-dark">{parcel.name}</h3>
                      <p className="text-text-light text-sm mt-2">{parcel.id}</p>
                    </div>

                    {/* Location */}
                    <div>
                      <p className="font-label text-xs text-gold-bright mb-1">LOCATION</p>
                      <p className="text-text-mid font-ui">{parcel.location}</p>
                    </div>

                    {/* Area */}
                    <div>
                      <p className="font-label text-xs text-gold-bright mb-1">AREA</p>
                      <p className="font-heading text-xl text-text-dark">{parcel.area}</p>
                    </div>

                    {/* Price */}
                    <div>
                      <p className="font-label text-xs text-gold-bright mb-1">PRICE</p>
                      <p className="font-heading text-xl text-text-dark">{parcel.price}</p>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                      <span
                        className={`px-4 py-2 rounded-full font-label text-sm text-center ${getStatusColor(
                          parcel.status
                        )}`}
                      >
                        {parcel.status}
                      </span>
                      {parcel.status === 'Available' && (
                        <motion.button
                          className="btn-royal text-sm py-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Enquire
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center bg-gradient-royal rounded-2xl p-10 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl mb-4">Interested in {project.title}?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Get detailed information about available plots, pricing, and investment opportunities.
            </p>
            <motion.a
              href={`https://wa.me/917208324505?text=Hi, I'm interested in ${project.title} project. Please provide more details.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enquire on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </main>

      {/* Parcel Modal */}
      <ParcelModal isOpen={!!selectedParcel} parcel={selectedParcel} onClose={() => setSelectedParcel(null)} />

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/917208324505?text=Hello A New Era Developers, I'm interested in learning more about your projects."
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
