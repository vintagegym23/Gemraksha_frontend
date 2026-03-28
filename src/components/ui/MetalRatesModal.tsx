import React from 'react';
import { X, RefreshCw, Info, TrendingUp, TrendingDown, Stars, Award, Diamond } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MetalRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetalRatesModal = ({ isOpen, onClose }: MetalRatesModalProps) => {
  const rates = [
    { name: 'Gold (24K)', price: '$65.40', unit: '/g', change: '+0.45%', trend: 'up', icon: Stars, color: 'text-yellow-500', barColor: 'bg-yellow-400' },
    { name: 'Gold (22K)', price: '$60.15', unit: '/g', change: '+0.32%', trend: 'up', icon: Award, color: 'text-yellow-600', barColor: 'bg-yellow-600' },
    { name: 'Silver', price: '$0.85', unit: '/g', change: '-0.12%', trend: 'down', icon: Diamond, color: 'text-gray-500', barColor: 'bg-gray-400' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl z-[210] overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400 group z-20"
            >
              <X size={24} className="group-hover:text-red-500 transition-colors" />
            </button>

            <div className="pt-12 pb-6 px-8 text-center">
              <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <RefreshCw size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-3">
                Today's Metal Rates
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-light text-sm md:text-base">
                Real-time market updates for precious metals
              </p>
            </div>

            <div className="px-8 md:px-12 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {rates.map((rate) => {
                  const Icon = rate.icon;
                  return (
                    <div key={rate.name} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-1 ${rate.barColor}`} />
                      <div className={`w-12 h-12 mx-auto bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={rate.color} size={24} />
                      </div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{rate.name}</h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl font-serif font-bold text-gray-900 dark:text-white">{rate.price}</span>
                        <span className="text-xs text-gray-400">{rate.unit}</span>
                      </div>
                      <div className={`mt-2 flex items-center justify-center text-xs font-medium ${rate.trend === 'up' ? 'text-green-500' : 'text-red-400'}`}>
                        {rate.trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                        <span>{rate.change}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 flex items-start gap-4 mb-8 border border-primary/10">
                <div className="shrink-0 mt-0.5">
                  <Info className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="text-primary font-bold font-serif text-sm mb-1">Pricing Formula</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Final Price = (Stone + Metal Weight × Rate) + Making Charges
                  </p>
                </div>
              </div>

              <div className="text-center border-t border-gray-100 dark:border-gray-800 pt-6">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Rates last updated: Today, 10:42 AM
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
