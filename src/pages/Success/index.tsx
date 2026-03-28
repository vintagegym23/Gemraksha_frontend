import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mail, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'motion/react';

const Success = () => {
  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div className="container mx-auto px-4 py-24 text-center space-y-12">
      <div className="flex justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="p-6 bg-green-50 rounded-full"
        >
          <CheckCircle size={80} className="text-green-500" />
        </motion.div>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-widest">Order Confirmed</h1>
        <p className="text-gray-500 font-light text-lg">
          Thank you for choosing GEMRAKSHA. Your rare gemstone has been reserved and is being prepared for its journey to you.
        </p>
      </div>

      <div className="bg-gray-50 p-8 rounded-sm max-w-md mx-auto grid grid-cols-2 gap-8 text-left">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Order Number</p>
          <p className="text-sm font-bold tracking-widest">#GR-{orderNumber}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Estimated Delivery</p>
          <p className="text-sm font-bold tracking-widest">3-5 Business Days</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Shipping Method</p>
          <p className="text-sm font-bold tracking-widest">Insured Express</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Payment Status</p>
          <p className="text-sm font-bold tracking-widest text-green-600 uppercase">Paid</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="p-6 border border-gray-100 rounded-sm flex items-start space-x-4 text-left">
          <Mail size={24} className="text-gold shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold uppercase tracking-widest">Email Confirmation</h4>
            <p className="text-xs text-gray-500">We've sent a detailed receipt and tracking info to your email.</p>
          </div>
        </div>
        <div className="p-6 border border-gray-100 rounded-sm flex items-start space-x-4 text-left">
          <Calendar size={24} className="text-gold shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold uppercase tracking-widest">Concierge Support</h4>
            <p className="text-xs text-gray-500">Our gemologists are available 24/7 to answer any questions.</p>
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" variant="outline">
          <Link to="/collection">Continue Shopping</Link>
        </Button>
        <Button size="lg">
          <Link to="/profile">Track Order</Link>
        </Button>
      </div>
    </div>
  );
};

export default Success;
