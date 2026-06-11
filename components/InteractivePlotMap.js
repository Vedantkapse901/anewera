'use client';

import { motion } from 'framer-motion';

export default function InteractivePlotMap({ parcels, onSelectParcel }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-50 border-2 border-green-500 hover:bg-green-100';
      case 'Sold':
        return 'bg-red-50 border-2 border-red-400 hover:bg-red-100';
      case 'Reserved':
        return 'bg-yellow-50 border-2 border-yellow-400 hover:bg-yellow-100';
      case 'Pre-Launch':
        return 'bg-blue-50 border-2 border-blue-400 hover:bg-blue-100';
      case 'Garden':
        return 'border-2 border-dashed border-green-400 bg-green-50/50';
      default:
        return 'bg-gray-50 border-2 border-gray-400 hover:bg-gray-100';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Available':
        return 'text-green-700';
      case 'Sold':
        return 'text-red-700';
      case 'Reserved':
        return 'text-yellow-700';
      case 'Pre-Launch':
        return 'text-blue-700';
      case 'Garden':
        return 'text-green-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl p-8 royal-card shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header with Legend */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-xl text-text-dark">INTERACTIVE MAP</h2>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap gap-4 justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
            <span className="text-xs font-ui text-text-mid">Avail</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded"></div>
            <span className="text-xs font-ui text-text-mid">Sold</span>
          </div>
        </motion.div>
      </div>

      {/* Plot Grid */}
      <motion.div
        className="grid grid-cols-5 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Row 1 */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '10'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Sold')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-red-700">10</span>
            <span className="text-xs text-red-600">433sqyd</span>
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '9'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">9</span>
            <span className="text-xs text-green-600">350sqyd</span>
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '8'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">8</span>
            <span className="text-xs text-green-600">350sqyd</span>
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '7'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Sold')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-red-700">7</span>
            <span className="text-xs text-red-600">350sqyd</span>
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '6'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">6</span>
            <span className="text-xs text-green-600">350sqyd</span>
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '5'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">5</span>
            <span className="text-xs text-green-600">433sqyd</span>
          </button>
        </motion.div>

        {/* Row 2 */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '11'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">11</span>
            <span className="text-xs text-green-600">404sqyd</span>
          </button>
        </motion.div>

        {/* Garden Area - Spanning 3 cells */}
        <div className="col-span-3 row-span-2 rounded-lg border-4 border-dashed border-green-400 bg-green-50/50 flex flex-col items-center justify-center gap-2">
          <span className="text-4xl">🌳</span>
          <span className="font-heading text-green-700 text-sm">GARDEN</span>
        </div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '4'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Sold')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-red-700">4</span>
            <span className="text-xs text-red-600">404sqyd</span>
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '5'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">5</span>
            <span className="text-xs text-green-600">433sqyd</span>
          </button>
        </motion.div>

        {/* Row 3 */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '12'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">12</span>
            <span className="text-xs text-green-600">700sqyd</span>
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '3'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">3</span>
            <span className="text-xs text-green-600">700sqyd</span>
          </button>
        </motion.div>

        {/* Row 4 */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '13'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Sold')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-red-700">13</span>
            <span className="text-xs text-red-600">352sqyd</span>
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '14'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">14</span>
            <span className="text-xs text-green-600">352sqyd</span>
          </button>
        </motion.div>

        {/* Empty space and entry road label */}
        <div className="col-span-2 flex items-center justify-center">
          <span className="text-xs text-text-mid font-label tracking-wider">18.00 MTR ENTRY ROAD</span>
        </div>

        {/* Row 5 */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '1'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Sold')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-red-700">1</span>
            <span className="text-xs text-red-600">352sqyd</span>
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => onSelectParcel(parcels.find((p) => p.id === '2'))}
            className={`w-full aspect-square rounded-lg ${getStatusColor('Available')} flex flex-col items-center justify-center cursor-pointer font-heading text-sm font-bold transition-all`}
          >
            <span className="text-green-700">2</span>
            <span className="text-xs text-green-600">352sqyd</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
