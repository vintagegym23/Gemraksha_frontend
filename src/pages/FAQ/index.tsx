import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Truck, RotateCcw, Diamond, CreditCard, Paintbrush, Headset, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../components/ui/Button';

const FAQItem = ({ question, answer, icon: Icon, isOpen, onClick }: any) => (
  <div 
    className={`bg-white dark:bg-gray-800 rounded-xl border transition-all cursor-pointer overflow-hidden ${isOpen ? 'border-primary/30 shadow-lg' : 'border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md'}`}
    onClick={onClick}
  >
    <div className="p-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${isOpen ? 'bg-primary/10 text-primary' : 'bg-gray-50 dark:bg-gray-700 text-gray-400'}`}>
          <Icon size={20} />
        </div>
        <h3 className={`text-lg font-semibold transition-colors ${isOpen ? 'text-primary' : 'text-gray-900 dark:text-gray-200'}`}>
          {question}
        </h3>
      </div>
      <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-gray-50 dark:border-gray-700"
        >
          <div className="p-6 text-gray-600 dark:text-gray-400 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const categories = [
    { name: 'Shipping & Delivery', icon: Truck, active: true },
    { name: 'Returns & Exchanges', icon: RotateCcw },
    { name: 'Product Authenticity', icon: Diamond },
    { name: 'Payment & Pricing', icon: CreditCard },
    { name: 'Customization', icon: Paintbrush },
  ];

  const faqs = [
    {
      question: "What is your shipping policy?",
      icon: Truck,
      answer: (
        <div className="space-y-4">
          <p>At GEMRAKSHA, we ensure that your precious gemstones and jewelry reach you safely and on time. We partner with trusted logistics providers to guarantee a secure and premium delivery experience for every order.</p>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border-l-4 border-primary">
            <h4 className="font-bold text-gray-900 dark:text-gray-200 mb-1 flex items-center">
              <Clock size={14} className="mr-2 text-primary" />
              Standard Processing
            </h4>
            <p className="text-sm">Our standard delivery timeline is <strong className="text-primary">7-8 working days</strong> from the date of order confirmation.</p>
          </div>
          <p className="text-xs text-gray-400 italic">*Note: Custom jewelry orders may take additional time for crafting and certification.</p>
        </div>
      )
    },
    {
      question: "Can I customize my gemstone ring?",
      icon: Diamond,
      answer: (
        <div className="space-y-4">
          <p>Absolutely. GEMRAKSHA specializes in bespoke jewelry. You can select your preferred gemstone, metal type (18k Gold, Platinum), and setting style. Our design experts will work with you to bring your vision to life.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center space-y-2">
              <Paintbrush className="text-primary mx-auto" size={24} />
              <p className="text-sm font-medium">Design Consultation</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center space-y-2">
              <Diamond className="text-primary mx-auto" size={24} />
              <p className="text-sm font-medium">CAD Modeling</p>
            </div>
          </div>
        </div>
      )
    },
    {
      question: "How are gold rates calculated?",
      icon: CreditCard,
      answer: "Gold rates fluctuate daily based on market value. We update our prices every morning at 10:00 AM IST to reflect the current market standard. The price you see at checkout is the final price locked for your purchase."
    },
    {
      question: "What is the return & cancellation policy?",
      icon: RotateCcw,
      answer: "We offer a hassle-free 7-day return policy for standard items. However, customized pieces are non-refundable once production has started. Cancellations can be made within 24 hours of placing the order."
    },
    {
      question: "Do you provide authenticity certificates?",
      icon: Diamond,
      answer: "Yes, every gemstone purchased from GEMRAKSHA comes with a certificate of authenticity from recognized gemological laboratories like GIA, IGI, or GRS, ensuring you receive exactly what you pay for."
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
      <header className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <h1 className="text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4 relative z-10">Help & FAQs</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light">
          Find answers to your questions about our luxury gemstones, shipping policies, and bespoke services.
        </p>
      </header>

      <div className="max-w-2xl mx-auto mb-16 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
        </div>
        <input 
          type="text"
          placeholder="Search for questions..."
          className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-full text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary transition-all duration-300 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-28">
            <h3 className="text-xl font-serif font-semibold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Categories</h3>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button className={`flex items-center w-full text-left font-medium group transition-colors ${cat.active ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-primary'}`}>
                    <cat.icon size={20} className="mr-3" />
                    {cat.name}
                    {cat.active && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Still need help?</h4>
              <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white flex items-center justify-center space-x-2">
                <Headset size={20} />
                <span className="font-bold tracking-wide">Contact Support</span>
              </Button>
              <p className="text-xs text-center text-gray-400 mt-3">Average response time: 2 hours</p>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                {...faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
