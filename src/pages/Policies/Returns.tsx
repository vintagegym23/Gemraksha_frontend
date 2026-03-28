import React from 'react';
import { Info, Diamond, BadgeCheck, AlertTriangle, Headset } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const Returns = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900 dark:text-white">Return & Exchange Policy</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          At GEMRAKSHA, we pride ourselves on creating bespoke jewelry and sourcing unique gemstones tailored specifically to your desires.
        </p>
      </div>

      <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-8 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mb-4">
            <Info className="text-gold" size={24} />
          </div>
          <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2">Important Notice</span>
          <h2 className="text-3xl font-serif font-bold text-primary dark:text-white mb-2">No Returns or Exchanges</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-lg mt-2">
            Due to the custom nature of our manufacturing process and high-value sourcing, please review our detailed policy below before proceeding with your purchase.
          </p>
        </div>
      </div>

      <div className="grid gap-6 mb-12">
        {[
          {
            title: 'Custom Manufacturing',
            icon: Diamond,
            desc: 'Every piece is handcrafted specifically for you. Once an order is placed and production begins, cancellations cannot be accepted as materials are procured and artisans are assigned immediately.'
          },
          {
            title: 'Quality Assurance',
            icon: BadgeCheck,
            desc: 'We guarantee the authenticity of our gemstones. Each item undergoes rigorous inspection by certified gemologists before shipping to ensure it meets our luxury standards and your expectations.'
          },
          {
            title: 'Damaged Items',
            icon: AlertTriangle,
            desc: 'In the unlikely event your jewelry arrives damaged, please contact our concierge within 24 hours of delivery with photographic evidence. We will arrange for a secure return and restoration.'
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/5 dark:bg-gray-700 flex items-center justify-center text-primary">
                <item.icon size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-6">Need assistance with a specific order issue?</p>
        <Button className="h-14 px-10 rounded-full flex items-center gap-3 mx-auto group">
          <Headset size={20} className="group-hover:animate-pulse" />
          <span>Contact Concierge</span>
        </Button>
      </div>
    </div>
  );
};

export default Returns;
