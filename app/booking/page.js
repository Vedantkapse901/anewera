'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { AnimatedContainer } from '@/components/AnimatedContainer';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    coach: 'Sleeper',
    persons: '',
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    const message = `Site visit booking request\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nPreferred date: ${formData.date}\nCoach type: ${formData.coach}\nPersons: ${formData.persons}`;
    const encoded = encodeURIComponent(message);
    window.open(
      `https://wa.me/917208324505?text=${encoded}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 },
    },
  };

  const indicatorVariants = {
    inactive: { backgroundColor: '#ECEFF1', borderColor: '#78909C', scale: 1 },
    active: { backgroundColor: '#1A237E', borderColor: '#D4A017', scale: 1.2 },
    completed: { backgroundColor: '#2E7D32', borderColor: '#D4A017', scale: 1 },
  };

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-pearl to-white">
        <div className="royal-container max-w-3xl mx-auto">
          {/* Header */}
          <AnimatedContainer delay={0}>
            <div className="text-center mb-12">
              <p className="section-label">--- PLAN YOUR VISIT ---</p>
              <h1 className="font-heading text-5xl mt-4 text-text-dark">
                Book a Curated Site Experience
              </h1>
              <p className="text-text-mid mt-3">
                Complete the 3-step process to schedule your site visit
              </p>
            </div>
          </AnimatedContainer>

          {/* Booking Form Card */}
          <motion.div
            className="royal-card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Step Indicators */}
            <motion.div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center flex-1">
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-white font-label font-bold"
                      variants={indicatorVariants}
                      initial="inactive"
                      animate={
                        step > num ? 'completed' : step === num ? 'active' : 'inactive'
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {step > num ? '✓' : num}
                    </motion.div>

                    {num < 3 && (
                      <motion.div
                        className="h-1 flex-1 mx-3 bg-gold-bright rounded"
                        initial={{ width: '100%', opacity: 0.3 }}
                        animate={{
                          opacity: step > num ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <motion.div
                className="h-2 bg-silver rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-full bg-gold-bright"
                  initial={{ width: '33.33%' }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </motion.div>

            {/* Step 1: Personal Details */}
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="hidden"
              animate={step === 1 ? 'visible' : 'hidden'}
              exit="exit"
              className={step === 1 ? 'block' : 'hidden'}
            >
              <h2 className="font-heading text-3xl mb-6 text-text-dark">Step 1 — Personal Details</h2>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded border-2 border-silver focus:border-gold-bright focus:outline-none transition-colors"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (+91)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded border-2 border-silver focus:border-gold-bright focus:outline-none transition-colors"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded border-2 border-silver focus:border-gold-bright focus:outline-none transition-colors"
                  />
                </motion.div>
              </div>

              <motion.button
                onClick={handleNext}
                className="btn-royal mt-6 w-full justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            </motion.div>

            {/* Step 2: Travel Info */}
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="hidden"
              animate={step === 2 ? 'visible' : 'hidden'}
              exit="exit"
              className={step === 2 ? 'block' : 'hidden'}
            >
              <h2 className="font-heading text-3xl mb-6 text-text-dark">
                Step 2 — Travel & Train Info
              </h2>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded border-2 border-silver focus:border-gold-bright focus:outline-none transition-colors"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <select
                    name="coach"
                    value={formData.coach}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded border-2 border-silver focus:border-gold-bright focus:outline-none transition-colors"
                  >
                    <option>Sleeper</option>
                    <option>AC Coach</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <input
                    type="number"
                    name="persons"
                    placeholder="Number of Persons"
                    value={formData.persons}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded border-2 border-silver focus:border-gold-bright focus:outline-none transition-colors"
                  />
                </motion.div>
              </div>

              <div className="mt-6 flex gap-3">
                <motion.button
                  onClick={handleBack}
                  className="btn-outline flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  className="btn-royal flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>

            {/* Step 3: Payment & Confirmation */}
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="hidden"
              animate={step === 3 ? 'visible' : 'hidden'}
              exit="exit"
              className={step === 3 ? 'block' : 'hidden'}
            >
              <h2 className="font-heading text-3xl mb-6 text-text-dark">
                Step 3 — Confirmation
              </h2>

              <motion.div
                className="bg-blue-50 rounded-xl p-6 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="text-sm text-text-mid mb-4">
                  Complete your booking by sending a confirmation message on WhatsApp.
                </p>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <a href="tel:+917208324505" className="contact-link block">
                    📞 +91 7208324505
                  </a>
                  <a href="mailto:aneweradevelopers@gmail.com" className="contact-link block">
                    📧 aneweradevelopers@gmail.com
                  </a>
                </motion.div>
              </motion.div>

              {/* Summary */}
              <motion.div
                className="bg-pearl rounded-lg p-4 mb-6 space-y-2 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p>
                  <span className="font-ui font-semibold">Name:</span> {formData.name || 'Not provided'}
                </p>
                <p>
                  <span className="font-ui font-semibold">Phone:</span> {formData.phone || 'Not provided'}
                </p>
                <p>
                  <span className="font-ui font-semibold">Email:</span> {formData.email || 'Not provided'}
                </p>
                <p>
                  <span className="font-ui font-semibold">Date:</span> {formData.date || 'Not provided'}
                </p>
                <p>
                  <span className="font-ui font-semibold">Coach:</span> {formData.coach}
                </p>
                <p>
                  <span className="font-ui font-semibold">Persons:</span>{' '}
                  {formData.persons || 'Not provided'}
                </p>
              </motion.div>

              <div className="mt-6 flex gap-3">
                <motion.button
                  onClick={handleBack}
                  className="btn-outline flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={handleConfirm}
                  className="btn-royal flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirm on WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/917208324505?text=Hello%20A%20New%20Era%20Developers%2C%20I%20want%20to%20book%20a%20site%20visit."
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
