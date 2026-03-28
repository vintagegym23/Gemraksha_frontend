import React from 'react';
import { Shield, Lock, Mail, Cookie, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const Privacy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Data Collection',
      icon: Shield,
      content: (
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            We collect personal information such as your name, email address, shipping address, and phone number when you place an order or register for an account.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We use this information to process your orders, communicate with you regarding your bespoke jewelry status, and improve our services.
          </p>
        </>
      ),
      isOpen: true
    },
    { title: 'Payment Security', icon: Lock, isOpen: false },
    { title: 'Email Communication', icon: Mail, isOpen: false },
    { title: 'Cookies & Tracking', icon: Cookie, isOpen: false },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-6 border border-primary/20">
          UPDATED OCT 2023
        </div>
        <h1 className="text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          At GEMRAKSHA, the trust you place in us is as precious as the gems we curate. We are committed to protecting your privacy with the highest standards of security.
        </p>
      </header>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className={`p-6 flex items-center justify-between cursor-pointer group ${section.isOpen ? 'bg-primary/5 border-b border-primary/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${section.isOpen ? 'bg-white dark:bg-gray-700 text-primary' : 'bg-primary/5 text-primary'}`}>
                  <section.icon size={20} />
                </div>
                <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              </div>
              <div className={`text-gray-400 transition-transform ${section.isOpen ? 'rotate-180' : ''}`}>
                <ArrowLeft size={20} className="-rotate-90" />
              </div>
            </div>
            {section.isOpen && section.content && (
              <div className="p-8">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/10 text-center">
        <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-2">Have questions about your data?</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Our dedicated privacy team is here to assist you with any inquiries.</p>
        <Button className="rounded-full px-8 flex items-center gap-2 mx-auto transform hover:-translate-y-0.5">
          <ShieldCheck size={16} />
          Contact Privacy Officer
        </Button>
      </div>
    </div>
  );
};

export default Privacy;
