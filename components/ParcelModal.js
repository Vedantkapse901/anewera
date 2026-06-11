'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function ParcelModal({ isOpen, parcel, onClose }) {
  if (!parcel) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'Sold':
        return 'bg-red-500';
      case 'Reserved':
        return 'bg-yellow-500';
      case 'Pre-Launch':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto royal-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-royal text-white p-6 flex justify-between items-start">
              <div>
                <p className="font-label text-xs text-gold-light mb-2">PLOT DETAILS</p>
                <h2 className="font-heading text-3xl">{parcel.name}</h2>
              </div>
              <motion.button
                onClick={onClose}
                className="text-2xl hover:rotate-90 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-full text-white font-label text-sm ${getStatusColor(
                    parcel.status
                  )}`}
                >
                  {parcel.status}
                </span>
              </motion.div>

              {/* Grid Info */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="border-l-4 border-gold-bright pl-4">
                  <p className="text-text-light text-sm font-label mb-1">PARCEL ID</p>
                  <p className="font-heading text-lg text-text-dark">{parcel.id}</p>
                </div>

                <div className="border-l-4 border-gold-bright pl-4">
                  <p className="text-text-light text-sm font-label mb-1">AREA</p>
                  <p className="font-heading text-lg text-text-dark">{parcel.area}</p>
                </div>

                <div className="border-l-4 border-gold-bright pl-4">
                  <p className="text-text-light text-sm font-label mb-1">PRICE</p>
                  <p className="font-heading text-lg text-text-dark">{parcel.price}</p>
                </div>

                <div className="border-l-4 border-gold-bright pl-4 md:col-span-2">
                  <p className="text-text-light text-sm font-label mb-1">LOCATION</p>
                  <p className="font-ui text-text-dark">{parcel.location}</p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                className="bg-pearl rounded-lg p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-heading text-lg text-text-dark mb-2">Plot Summary</h3>
                <p className="text-text-mid font-ui leading-relaxed">
                  This is a {parcel.area} plot located in {parcel.location}. The plot is currently{' '}
                  <span className="font-semibold">{parcel.status.toLowerCase()}</span> for investment. With a
                  competitive pricing of {parcel.price}, this represents a solid investment opportunity in a
                  strategic location.
                </p>
              </motion.div>

              {/* Details Table */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-heading text-lg text-text-dark">Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-silver">
                    <span className="text-text-mid font-ui">Plot Dimensions</span>
                    <span className="font-semibold text-text-dark">Based on {parcel.area}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-silver">
                    <span className="text-text-mid font-ui">Price per Sq.Ft</span>
                    <span className="font-semibold text-text-dark">Premium Rate</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-silver">
                    <span className="text-text-mid font-ui">Legal Status</span>
                    <span className="font-semibold text-text-dark">Clear Title</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-text-mid font-ui">Documentation</span>
                    <span className="font-semibold text-text-dark">Ready</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex gap-3 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={onClose}
                  className="flex-1 btn-outline"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
                <motion.a
                  href={`https://wa.me/917208324505?text=Hi, I'm interested in plot ${parcel.id} (${parcel.name}) - ${parcel.area} at ${parcel.price}. Please provide more details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-royal text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enquire Now
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
