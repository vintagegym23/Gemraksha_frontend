import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, Instagram, Facebook, Twitter, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUIStore } from '../../store/useStore';

export const MobileMenu = () => {
  const { isMenuOpen, setMenuOpen, setMetalRatesOpen } = useUIStore();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Shipping Policy', path: '/policies/shipping' },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-[100]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-full max-w-xs bg-white z-[110] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xl font-serif font-bold tracking-widest text-primary">GEMRAKSHA</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Navigation</p>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between text-sm uppercase tracking-widest font-medium ${location.pathname === link.path ? 'text-primary' : 'text-gray-500'}`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight size={16} className="text-gray-300" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Market Rates</p>
                <button 
                  onClick={() => {
                    setMenuOpen(false);
                    setMetalRatesOpen(true);
                  }}
                  className="flex items-center space-x-3 w-full p-4 bg-primary/5 rounded-xl text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary/10 transition-colors"
                >
                  <RefreshCw size={18} />
                  <span>View Metal Rates</span>
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Connect With Us</p>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="space-y-4">
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                  © {new Date().getFullYear()} GEMRAKSHA
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
