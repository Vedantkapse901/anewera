'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { AnimatedContainer, AnimatedText } from '@/components/AnimatedContainer';

export default function Home() {
  const [plotArea, setPlotArea] = useState(300);
  const [purchaseYear, setPurchaseYear] = useState(2026);
  const [saleYear, setSaleYear] = useState(2032);
  const [projections, setProjections] = useState(null);

  const calculateProjection = () => {
    const years = saleYear - purchaseYear;
    const basePrice = plotArea * 500000; // ₹5 lakh per sq ft base

    const conservative = basePrice * Math.pow(1.06, years);
    const moderate = basePrice * Math.pow(1.10, years);
    const optimistic = basePrice * Math.pow(1.15, years);

    setProjections({
      conservative: Math.round(conservative),
      moderate: Math.round(moderate),
      optimistic: Math.round(optimistic),
    });
  };

  const projects = [
    {
      id: 1,
      title: 'Shivneri',
      category: 'Land',
      location: 'Dholera SIR, Gujarat',
      description: 'Signature plotted development with legal clarity.',
      image: '/s1.jpg',
    },
    {
      id: 2,
      title: 'Dream City',
      category: 'Land',
      location: 'Dholera SIR, Gujarat',
      description: 'Upcoming land release with growth momentum.',
      image: '/s2.jpg',
    },
    {
      id: 3,
      title: 'Mira Residence One',
      category: 'Construction',
      location: 'Mira Road, Maharashtra',
      description: 'Refined residential construction in prime location.',
      image: '/s3.jpg',
    },
  ];

  const stats = [
    { value: '12+', label: 'Years' },
    { value: '500+', label: 'Plots' },
    { value: '3', label: 'Landmark Projects' },
    { value: '₹500Cr+', label: 'Assets' },
  ];

  const features = [
    { title: 'RERA Registered', desc: 'Accountable delivery anchored in compliant governance.' },
    { title: 'DMIC Alignment', desc: 'Location strategy tuned to growth corridors.' },
    { title: 'Transparent Pricing', desc: 'Clear disclosures and milestone communication.' },
    { title: 'Legal Clarity', desc: 'Documentation-first process for confident ownership.' },
    { title: 'Expert Guidance', desc: 'Advisory crafted for HNIs, NRIs, and families.' },
    { title: 'Quality Construction', desc: 'Detail-led execution standards for timeless outcomes.' },
  ];

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background slider */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/s1.jpg)' }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          />
          <div className="absolute inset-0 bg-gradient-regal opacity-75" />

          {/* Hero Content */}
          <div className="royal-container relative z-10 py-20">
            <motion.p
              className="section-label text-gold-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              --- DHOLERA SIR · MIRA ROAD ---
            </motion.p>

            <motion.h1
              className="font-display text-5xl md:text-8xl mt-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Building Tomorrow's Legacy
            </motion.h1>

            <motion.h2
              className="font-heading italic text-2xl mt-3 text-gold-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Premium Land & Architectural Construction Across India
            </motion.h2>

            <motion.div
              className="mt-9 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link href="/projects" className="btn-gold">
                Explore Projects
              </Link>
              <Link href="/booking" className="btn-outline !bg-transparent !text-white !border-white">
                Book a Site Visit
              </Link>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            className="absolute bottom-0 w-full border-t border-gold-bright bg-white/10 backdrop-blur-lg py-4 text-sm md:text-base"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="royal-container flex flex-wrap items-center justify-center gap-6 text-gold-light">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                >
                  <div className="text-center">
                    <div className="font-display text-xl">{stat.value}</div>
                    <div className="text-xs">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="section-white py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="royal-container">
            <AnimatedContainer delay={0}>
              <div className="text-center mb-10">
                <p className="section-label">--- WHY CHOOSE US ---</p>
                <h2 className="font-heading text-4xl mt-3">A Distinguished Standard of Delivery</h2>
              </div>
            </AnimatedContainer>

            <motion.div
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {features.map((feature, idx) => (
                <motion.article
                  key={idx}
                  className="royal-card p-6 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, boxShadow: '0 12px 48px rgba(26, 35, 126, 0.22)' }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-ui font-semibold text-lg text-text-dark">{feature.title}</h3>
                  <p className="text-text-mid mt-2">{feature.desc}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Preview Section */}
        <motion.section
          className="section-blue py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="royal-container">
            <AnimatedContainer delay={0}>
              <div className="text-center mb-10">
                <p className="section-label">--- OUR PORTFOLIO ---</p>
                <h2 className="font-heading text-4xl mt-3">Landmark Projects</h2>
              </div>
            </AnimatedContainer>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.15 }}
              viewport={{ once: true }}
            >
              {projects.map((project, idx) => (
                <motion.article
                  key={project.id}
                  className="royal-card overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -12,
                    boxShadow: '0 12px 48px rgba(26, 35, 126, 0.22)',
                  }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="relative h-48 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                  <div className="p-5">
                    <h3 className="font-heading text-2xl text-text-dark">{project.title}</h3>
                    <p className="text-text-light text-sm">{project.location}</p>
                    <p className="text-text-mid mt-2 text-sm">{project.description}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/projects" className="btn-outline">
                View All Projects
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Calculator Section */}
        <motion.section
          className="section-white py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="royal-container max-w-3xl mx-auto">
            <AnimatedContainer delay={0}>
              <div className="text-center mb-10">
                <p className="section-label">--- YOUR INVESTMENT ---</p>
                <h2 className="font-heading text-4xl mt-3">Investment Projection Calculator</h2>
              </div>
            </AnimatedContainer>

            <motion.div
              className="rounded-2xl p-8 text-white bg-gradient-royal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <label className="block text-sm font-label mb-2">Plot Area (sq. yards)</label>
                  <input
                    type="number"
                    value={plotArea}
                    onChange={(e) => setPlotArea(Number(e.target.value))}
                    className="w-full p-3 rounded border border-gold-light bg-white text-text-dark"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-label mb-2">Purchase Year</label>
                  <input
                    type="number"
                    value={purchaseYear}
                    onChange={(e) => setPurchaseYear(Number(e.target.value))}
                    className="w-full p-3 rounded border border-gold-light bg-white text-text-dark"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-label mb-2">Target Sale Year</label>
                  <input
                    type="number"
                    value={saleYear}
                    onChange={(e) => setSaleYear(Number(e.target.value))}
                    className="w-full p-3 rounded border border-gold-light bg-white text-text-dark"
                  />
                </motion.div>
              </div>

              <motion.button
                onClick={calculateProjection}
                className="btn-gold w-full mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate Projection
              </motion.button>

              {projections && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-label">Conservative (6% growth)</span>
                      <span className="font-heading">₹{(projections.conservative / 10000000).toFixed(2)}Cr</span>
                    </div>
                    <div className="h-2 rounded bg-white/20">
                      <motion.div
                        className="h-2 rounded bg-gold-bright"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-label">Moderate (10% growth)</span>
                      <span className="font-heading">₹{(projections.moderate / 10000000).toFixed(2)}Cr</span>
                    </div>
                    <div className="h-2 rounded bg-white/20">
                      <motion.div
                        className="h-2 rounded bg-gold-bright"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-label">Optimistic (15% growth)</span>
                      <span className="font-heading">₹{(projections.optimistic / 10000000).toFixed(2)}Cr</span>
                    </div>
                    <div className="h-2 rounded bg-white/20">
                      <motion.div
                        className="h-2 rounded bg-gold-bright"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                  </div>
                  <p className="text-sm italic text-gold-light mt-6">
                    Projection is indicative only and not a guarantee of returns.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="section-pearl py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="royal-container text-center">
            <AnimatedContainer delay={0}>
              <p className="section-label">--- PLAN YOUR VISIT ---</p>
              <h2 className="font-heading text-4xl mt-3">Ready to Invest in Your Future?</h2>
              <p className="text-text-mid mt-4 max-w-2xl mx-auto">
                Experience our projects firsthand with a guided site visit.
              </p>
              <Link href="/booking" className="btn-royal mt-6 inline-block">
                Book Your Visit
              </Link>
            </AnimatedContainer>
          </div>
        </motion.section>
      </main>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/917208324505?text=Hello%20A%20New%20Era%20Developers%2C%20I%20would%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        💬
      </motion.a>

      <Footer />
    </PageTransition>
  );
}
