import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { CartDrawer } from '../ui/CartDrawer';
import { MetalRatesModal } from '../ui/MetalRatesModal';
import { SearchOverlay } from './SearchOverlay';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/useStore';

import { Check, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const ToastContainer = () => {
  const { toasts, removeToast } = useUIStore();
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-[90px] left-1/2 z-[200] flex w-full max-w-[340px] -translate-x-1/2 flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="flex items-center gap-3 rounded-xl bg-[#340e34] px-4 py-3.5 text-[12px] font-bold text-white shadow-xl shadow-black/20 border border-white/5 pointer-events-auto w-full"
          >
            <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#ecd0a1] text-[#340e34]">
              <Check size={12} strokeWidth={4} />
            </div>
            <span className="flex-1 tracking-wide leading-tight truncate">{toast.message}</span>
            {toast.message.toLowerCase().includes('cart') && (
              <button
                type="button"
                onClick={() => {
                  removeToast(toast.id);
                  navigate('/cart');
                }}
                className="shrink-0 rounded-[6px] px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d0a061] transition-colors active:bg-white/10"
              >
                View Cart
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isMetalRatesOpen, setMetalRatesOpen } = useUIStore();

  const isSizeGuide = location.pathname === '/size-guide';

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!isSizeGuide && <Header />}
      <MobileMenu />
      <CartDrawer />
      <SearchOverlay />
      <MetalRatesModal isOpen={isMetalRatesOpen} onClose={() => setMetalRatesOpen(false)} />
      <ToastContainer />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      {!isSizeGuide && <Footer />}
      <BottomNav />
    </div>
  );
};
