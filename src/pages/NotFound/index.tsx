import React from 'react';
import { Link } from 'react-router-dom';
import { Diamond, LayoutGrid, Award } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'motion/react';

const NotFound = () => {
  return (
    <div className="flex-grow flex items-center justify-center p-6 relative overflow-hidden min-h-[70vh]">
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-lg mx-auto text-center relative z-10">
        <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 border border-primary/20 rotate-45 w-48 h-48 m-auto" />
          <div className="absolute inset-0 border border-primary/40 rotate-45 w-40 h-40 m-auto" />
          <h2 className="relative text-8xl font-serif font-bold text-primary italic z-10 drop-shadow-sm">
            404
          </h2>
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl scale-50" />
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-50 dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h3>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
          <p className="text-gray-500 dark:text-gray-400 font-serif italic text-lg md:text-xl leading-relaxed mb-10 max-w-sm mx-auto">
            "The gem you are looking for has moved to a new collection."
          </p>
          <Button size="lg" className="rounded-full px-12">
            <Link to="/">Return Home</Link>
          </Button>
        </div>

        <div className="mt-12 hidden md:block">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-6 font-bold">Or explore our treasures</p>
          <div className="flex justify-center gap-8">
            {[
              { name: 'New Arrivals', icon: Diamond },
              { name: 'Collections', icon: LayoutGrid },
              { name: 'Bestsellers', icon: Award },
            ].map((item) => (
              <Link key={item.name} to="/collection" className="group flex flex-col items-center gap-3 text-gray-500 hover:text-primary transition-colors">
                <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center group-hover:shadow-lg transition-all border border-gray-50 dark:border-gray-700">
                  <item.icon size={24} className="text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
