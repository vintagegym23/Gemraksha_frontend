import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUIStore, useCartStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { useNavigate, Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { isCartOpen, setCartOpen } = useUIStore();
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag size={24} className="text-primary" />
                <h3 className="text-xl font-serif font-bold uppercase tracking-widest">Your Collection</h3>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                  <ShoppingBag size={48} className="text-gray-200" />
                  <p className="text-gray-500 font-light">Your collection is currently empty.</p>
                  <Button variant="outline" onClick={() => { setCartOpen(false); navigate('/collection'); }}>
                    Explore Gemstones
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex space-x-4 group">
                    <Link 
                      to={`/product/${item.slug}`} 
                      onClick={() => setCartOpen(false)}
                      className="h-24 w-20 shrink-0 bg-gray-50 rounded-sm overflow-hidden"
                    >
                      <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                    </Link>
                    <div className="flex-grow space-y-2">
                      <div className="flex justify-between items-start">
                        <Link 
                          to={`/product/${item.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-100 rounded-sm">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-50"><Minus size={12} /></button>
                          <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-50"><Plus size={12} /></button>
                        </div>
                        <p className="text-sm font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-6 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Subtotal</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(totalPrice())}</span>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" size="lg" onClick={() => { setCartOpen(false); navigate('/checkout'); }}>
                    Checkout Now
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => { setCartOpen(false); navigate('/cart'); }}>
                    View Full Collection
                  </Button>
                </div>
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                  Complimentary Insured Shipping on all orders
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
