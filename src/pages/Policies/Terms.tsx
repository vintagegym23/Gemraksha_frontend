import React from 'react';
import { Gavel, Calendar, Mail, PiggyBank, Palette, Headset, Facebook, Instagram, AtSign } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const Terms = () => {
  const sections = [
    {
      id: 'general-provisions',
      num: '1',
      title: 'General Provisions',
      content: (
        <>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
            GEMRAKSHA specializes in certified high-value gemstones. We ensure that all descriptions, images, and prices are accurate; however, errors may occur. We reserve the right to correct any errors and to change or update information at any time without prior notice.
          </p>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            The content provided on this website is for general information and use only. It is subject to change without notice. Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information found on this website.
          </p>
        </>
      )
    },
    {
      id: 'pricing-modifications',
      num: '2',
      title: 'Pricing & Modifications',
      content: (
        <>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
            Prices for our products are subject to change without notice due to market fluctuations in precious stones and metals (Gold, Platinum, Silver). We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 dark:text-gray-400">
            <li>Prices displayed are inclusive of applicable taxes unless stated otherwise.</li>
            <li>International orders may be subject to additional duties and taxes.</li>
          </ul>
        </>
      )
    },
    {
      id: 'payment-terms',
      num: '3',
      title: 'Payment Terms',
      content: (
        <>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            We accept major credit cards, secure bank transfers, and verified digital wallets. For high-value transactions exceeding $10,000, additional identity verification may be required to prevent fraud.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-primary">
            <p className="text-sm italic text-gray-600 dark:text-gray-300">
              <span className="font-bold text-primary not-italic">Note:</span> Full payment must be cleared before shipment for all certified gemstones. We currently do not offer Cash on Delivery (COD) for items valued over $500.
            </p>
          </div>
        </>
      )
    },
    {
      id: 'custom-orders',
      num: '4',
      title: 'Custom Orders',
      content: (
        <>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
            Custom jewelry pieces are created specifically for you based on your unique specifications. As such, these items are <span className="font-bold text-red-500">non-refundable and non-exchangeable</span> once production has commenced.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <PiggyBank className="text-primary mr-2" size={16} /> Deposit
              </h4>
              <p className="text-sm text-gray-500">A 50% non-refundable deposit is required to begin any custom work or bespoke design process.</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Palette className="text-primary mr-2" size={16} /> Approval
              </h4>
              <p className="text-sm text-gray-500">Final CAD designs must be approved via email before the casting process begins.</p>
            </div>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center p-4 mb-6 bg-primary/10 rounded-full">
          <Gavel className="text-primary" size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">Terms & Conditions</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          Welcome to GEMRAKSHA. These terms govern your use of our luxury gemstone e-commerce platform. By accessing or using our services, you agree to be bound by these terms.
        </p>
        <div className="mt-4 flex items-center justify-center text-sm text-gray-400">
          <Calendar className="mr-2" size={16} />
          Effective Date: October 24, 2023
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        <aside className="hidden lg:block w-1/4 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            <div>
              <h3 className="font-serif font-semibold text-lg text-gray-900 dark:text-white mb-4 border-b border-primary pb-2">Table of Contents</h3>
              <nav className="space-y-1">
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className="block px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary hover:bg-primary/5 rounded-md transition-all">
                    {s.num}. {s.title}
                  </a>
                ))}
              </nav>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm">
              <h4 className="font-serif font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h4>
              <p className="text-sm text-gray-500 mb-4">Our legal team is available to clarify any doubts regarding our terms.</p>
              <Button className="w-full flex items-center justify-center gap-2">
                <Mail size={16} />
                Contact Legal
              </Button>
            </div>
          </div>
        </aside>

        <main className="w-full lg:w-3/4 space-y-12">
          {sections.map(section => (
            <section key={section.id} id={section.id} className="scroll-mt-28 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-serif font-bold text-xl mr-6">
                  {section.num}
                </span>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-gray-900 dark:text-white mb-4">{section.title}</h2>
                  {section.content}
                </div>
              </div>
            </section>
          ))}

          <div className="text-center pt-8 border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 text-sm mb-4">Have legal questions specifically about your order?</p>
            <Button className="px-8 flex items-center gap-2 mx-auto">
              <Headset size={18} />
              Contact Support
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Terms;
