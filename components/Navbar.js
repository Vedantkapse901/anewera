'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Booking', href: '/booking' },
  ];

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
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.22, 1, 0.36, 1], duration: 0.5 },
    },
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-60 bg-white shadow-card border-t-4 border-transparent hover:border-gold-bright transition-colors"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="royal-container flex h-20 items-center justify-between gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="A New Era Developers"
                width={48}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.div key={item.href} variants={itemVariants}>
                <Link
                  href={item.href}
                  className="relative font-ui font-medium text-text-dark group"
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gold-bright"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="hidden md:block"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/booking" className="btn-royal">
              Book Site Visit
            </Link>
          </motion.div>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-text-dark text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileOpen ? '×' : '☰'}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 bg-gradient-royal text-white md:hidden"
        style={{ paddingTop: '5rem' }}
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        pointerEvents={mobileOpen ? 'auto' : 'none'}
      >
        <div className="flex flex-col items-center gap-8 p-10 text-2xl font-ui mt-8">
          {navItems.map((item, idx) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              <Link href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
