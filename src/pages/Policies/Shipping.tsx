import React from 'react';
import { Truck, Clock, BadgeCheck, CreditCard, Banknote, Plane, Mailbox, Headset, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-6">
          <Truck className="text-3xl text-primary" size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">Shipping & Delivery</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          At <span className="font-semibold text-primary">GEMRAKSHA</span>, we ensure that your precious gemstones and jewelry reach you safely and on time. We partner with trusted logistics providers to guarantee a secure and premium delivery experience for every order.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 space-y-8">
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-primary" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-serif">Delivery Timeline</h2>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 border border-gray-100 dark:border-gray-600 mb-4">
              <div className="flex gap-4">
                <BadgeCheck className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Standard Processing</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Our standard delivery timeline is <span className="font-bold text-primary">7-8 working days</span> from the date of order confirmation.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 italic pl-2 border-l-2 border-gray-200 dark:border-gray-600">
              *Note: Custom jewelry orders may take additional time for crafting and certification.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-primary" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-serif">Payment & COD</h2>
            </div>
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4 flex items-start gap-3">
              <Banknote className="text-red-500 mt-0.5" size={20} />
              <div>
                <h3 className="text-red-800 dark:text-red-300 font-semibold mb-1">No Cash on Delivery (COD) Available</h3>
                <p className="text-red-600 dark:text-red-400 text-sm leading-relaxed">
                  Due to the high value of our certified gemstones and jewelry, we currently accept only prepaid orders via secure payment gateways to ensure safety and transparency.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="md:col-span-5 space-y-8">
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="text-primary" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-serif">Shipping Partners</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 hover:border-primary/30 transition-colors cursor-pointer group">
                <Plane className="text-3xl text-blue-600 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Blue Dart</span>
                <span className="text-xs text-gray-400 mt-1">Express</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 hover:border-primary/30 transition-colors cursor-pointer group">
                <Mailbox className="text-3xl text-red-600 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">India Post</span>
                <span className="text-xs text-gray-400 mt-1">Registered</span>
              </div>
            </div>
          </section>

          <section className="bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Have questions about your order?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Our concierge team is here to help you with tracking and delivery updates.</p>
            <Button variant="outline" className="w-full bg-white dark:bg-gray-800 flex items-center justify-center gap-2">
              <Headset size={20} />
              Contact Support
            </Button>
          </section>

          <div className="flex items-center justify-center gap-2 text-gold opacity-80 mt-4">
            <Lock size={14} />
            <span className="text-xs uppercase tracking-widest font-bold">Secure & Insured Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
