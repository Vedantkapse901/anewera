'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
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

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="pt-12 text-white bg-gradient-royal border-t-4 border-gold-bright"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="royal-container grid md:grid-cols-2 xl:grid-cols-4 gap-8 pb-8">
        {/* Logo Section */}
        <motion.div variants={itemVariants}>
          <Image
            src="/images/logo.png"
            alt="A New Era Developers"
            width={56}
            height={56}
            className="h-14 brightness-200"
          />
          <p className="font-heading italic text-gold-light mt-3">
            Crafting legacy through visionary land and construction.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <h4 className="font-label uppercase tracking-wider text-gold-light">Quick Links</h4>
          <ul className="mt-3 space-y-2">
            {[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: 'Booking', href: '/booking' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-light transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Projects */}
        <motion.div variants={itemVariants}>
          <h4 className="font-label uppercase tracking-wider text-gold-light">Projects</h4>
          <ul className="mt-3 space-y-2">
            <li>Shivneri - Land Development</li>
            <li>Dream City - Upcoming</li>
            <li>Mira Residence One - Residential</li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h4 className="font-label uppercase tracking-wider text-gold-light">Contact</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="tel:+917208324505" className="hover:text-gold-light transition-colors">
                +91 7208324505
              </a>
            </li>
            <li>
              <a
                href="mailto:aneweradevelopers@gmail.com"
                className="hover:text-gold-light transition-colors"
              >
                aneweradevelopers@gmail.com
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="py-3 text-sm bg-black/20"
        variants={itemVariants}
      >
        <div className="royal-container flex flex-wrap gap-3 justify-between items-center">
          <span>© {currentYear} A New Era Developers. All Rights Reserved.</span>
          <span>Proudly Built in India</span>
        </div>
      </motion.div>
    </motion.footer>
  );
}
