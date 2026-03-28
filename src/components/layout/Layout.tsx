import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { CartDrawer } from '../ui/CartDrawer';
import { MetalRatesModal } from '../ui/MetalRatesModal';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/useStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isMetalRatesOpen, setMetalRatesOpen } = useUIStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MobileMenu />
      <CartDrawer />
      <MetalRatesModal isOpen={isMetalRatesOpen} onClose={() => setMetalRatesOpen(false)} />
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
      <Footer />
      <BottomNav />
    </div>
  );
};
