import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Lock, CreditCard, Truck } from 'lucide-react';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 2000);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-4xl font-serif font-bold uppercase tracking-widest mb-12 text-center">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <form onSubmit={handleCheckout} className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold uppercase tracking-widest border-b border-gray-100 pb-4 flex items-center">
              <Truck size={20} className="mr-3 text-gold" />
              Shipping Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required placeholder="First Name" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary" />
              <input required placeholder="Last Name" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary" />
              <input required placeholder="Email Address" type="email" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary md:col-span-2" />
              <input required placeholder="Phone Number" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary md:col-span-2" />
              <input required placeholder="Address Line 1" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary md:col-span-2" />
              <input placeholder="Address Line 2 (Optional)" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary md:col-span-2" />
              <input required placeholder="City" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary" />
              <input required placeholder="Postal Code" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold uppercase tracking-widest border-b border-gray-100 pb-4 flex items-center">
              <CreditCard size={20} className="mr-3 text-gold" />
              Payment Method
            </h3>
            <div className="p-6 border border-primary bg-primary/5 rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest">Credit / Debit Card</span>
                <div className="flex space-x-2">
                  <div className="h-6 w-10 bg-gray-200 rounded-sm" />
                  <div className="h-6 w-10 bg-gray-200 rounded-sm" />
                </div>
              </div>
              <div className="space-y-4">
                <input required placeholder="Card Number" className="h-12 w-full px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary" />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="MM/YY" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary" />
                  <input required placeholder="CVV" className="h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full" isLoading={loading}>
            Complete Purchase
          </Button>

          <div className="flex items-center justify-center space-x-6 pt-4">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400">
              <Lock size={12} />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400">
              <ShieldCheck size={12} />
              <span>GIA Insured</span>
            </div>
          </div>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-sm space-y-8 sticky top-32">
            <h3 className="text-xl font-serif font-bold uppercase tracking-widest">Order Summary</h3>
            
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="h-20 w-16 shrink-0 bg-white rounded-sm overflow-hidden">
                    <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest">{item.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                    <p className="text-xs font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
