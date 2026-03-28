import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-8 bg-gray-50 rounded-full">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold">Your Collection is Empty</h2>
          <p className="text-gray-500 font-light">Discover rare gemstones to add to your collection.</p>
        </div>
        <Button size="lg" onClick={() => navigate('/collection')}>
          Start Exploring
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-serif font-bold uppercase tracking-widest">Your Collection</h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">{totalItems()} Items</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-100 group">
              <Link to={`/product/${item.slug}`} className="w-24 h-32 md:w-32 md:h-40 shrink-0 overflow-hidden rounded-sm bg-gray-50">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </Link>
              
              <div className="flex-grow flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gold font-bold">{item.category}</p>
                    <Link to={`/product/${item.slug}`} className="text-lg font-serif font-bold hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{item.details.weight} • {item.details.origin}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-100 rounded-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={() => navigate('/collection')}
            className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-sm space-y-8 sticky top-32">
            <h3 className="text-xl font-serif font-bold uppercase tracking-widest">Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 uppercase tracking-widest">Subtotal</span>
                <span className="font-bold">{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 uppercase tracking-widest">Shipping</span>
                <span className="text-green-600 font-bold uppercase tracking-widest">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 uppercase tracking-widest">Tax (GST)</span>
                <span className="font-bold">{formatPrice(totalPrice() * 0.03)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between">
                <span className="font-bold uppercase tracking-widest">Total</span>
                <span className="text-xl font-bold text-primary">{formatPrice(totalPrice() * 1.03)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
              <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                Secure checkout with end-to-end encryption
              </p>
            </div>

            <div className="pt-8 border-t border-gray-200 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gold text-center">Luxury Experience</p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-gray-500">
                  <div className="h-1 w-1 rounded-full bg-gold" />
                  <span>Insured Express Shipping</span>
                </li>
                <li className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-gray-500">
                  <div className="h-1 w-1 rounded-full bg-gold" />
                  <span>GIA/IGI Certification Included</span>
                </li>
                <li className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-gray-500">
                  <div className="h-1 w-1 rounded-full bg-gold" />
                  <span>Luxury Gift Packaging</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
