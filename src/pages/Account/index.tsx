import React, { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft, ChevronDown, ChevronRight,
  Search, Headset, Truck, Package, RefreshCw, ShieldAlert,
  FileText, Lock, CreditCard, Mail, Cookie, Info, CheckCircle,
  Clock, Gem, ExternalLink, User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/* ─── Types ─── */
type SubPage = 'faq' | 'shipping' | 'returns' | 'disclaimer' | 'terms' | 'privacy';

/* ─── Reusable accordion row ─── */
const Accordion = ({ label, icon: Icon, children }: { label: string; icon: any; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 md:px-0">
        <div className="flex items-center gap-3">
          <Icon size={16} strokeWidth={2} className="text-[#4a154b]" />
          <span className="text-[14px] font-semibold text-[#251622]">{label}</span>
        </div>
        <ChevronDown size={16} strokeWidth={2}
          className={`text-[#aaa] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="px-5 pb-5 text-[13px] leading-relaxed text-[#666] md:px-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Mobile-only back header ─── */
const MobileSubHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4 md:hidden">
    <button type="button" onClick={onBack}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3edf5] text-[#4a154b]">
      <ChevronLeft size={19} strokeWidth={2.5} />
    </button>
    <h1 className="text-[16px] font-semibold text-[#251622]">{title}</h1>
    <div className="w-9" />
  </div>
);

/* ──────────────────────────────────── CONTENT SECTIONS ──────────────────────────────────── */

const HelpFAQContent = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');
  const faqs = [
    { q: 'What is your shipping policy?', a: 'At GEMRAKSHA, we ensure that your precious gemstones and jewelry reach you safely and on time. We partner with trusted logistics providers. Standard delivery is 7–8 working days from order confirmation.' },
    { q: 'Can I customize my gemstone ring?', a: 'Absolutely. GEMRAKSHA specializes in bespoke jewelry. You can select your preferred gemstone, metal type (18k Gold, Platinum), and setting style. Our design experts will work with you to bring your vision to life.' },
    { q: 'How are gold rates calculated?', a: 'Gold rates fluctuate daily based on market value. We update our prices every morning at 10:00 AM IST. The price at checkout is final and locked for your purchase.' },
    { q: 'What is the return & cancellation policy?', a: 'We offer a 7-day return policy for standard items. Customized pieces are non-refundable once production has started. Cancellations can be made within 24 hours of placing the order.' },
    { q: 'Do you provide authenticity certificates?', a: 'Yes. Every gemstone from GEMRAKSHA comes with a certificate of authenticity from recognized gemological laboratories (GIA, IGI, or GRS).' },
  ];
  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="flex items-center gap-2.5 rounded-[14px] border border-[#e0d5cc] bg-[#fafafa] px-4 py-3 mb-5">
        <Search size={15} strokeWidth={2} className="text-[#bbb]" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for questions..."
          className="flex-1 bg-transparent text-[13px] text-[#251622] placeholder:text-[#bbb] focus:outline-none" />
      </div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4a154b]">Frequently Asked Questions</p>
      <div className="divide-y divide-gray-100 rounded-[16px] bg-white border border-gray-100 overflow-hidden">
        {filtered.map((f, i) => (
          <div key={i} className="cursor-pointer" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            <div className="flex items-center justify-between px-5 py-4">
              <span className={`text-[14px] font-medium ${openIdx === i ? 'text-[#4a154b]' : 'text-[#251622]'}`}>{f.q}</span>
              <ChevronDown size={15} strokeWidth={2}
                className={`flex-shrink-0 ml-3 text-[#aaa] transition-transform ${openIdx === i ? 'rotate-180 text-[#4a154b]' : ''}`} />
            </div>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-[13px] leading-relaxed text-[#666]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-[16px] bg-[#4a154b] px-5 py-4 text-center text-white">
        <Headset size={20} strokeWidth={1.8} className="mx-auto mb-2 text-[#d0a061]" />
        <p className="text-[13px] font-bold">Contact Support</p>
        <p className="mt-0.5 text-[11px] text-white/60">Avg. response time: 2 hours</p>
      </div>
    </div>
  );
};

const ShippingContent = () => (
  <div className="space-y-5">
    <div className="flex items-center gap-2">
      <Truck size={18} strokeWidth={2} className="text-[#4a154b]" />
      <h2 className="font-serif text-[20px] font-bold text-[#4a154b]">Shipping & Delivery</h2>
    </div>
    <p className="text-[13px] leading-relaxed text-[#666]">
      At <span className="font-bold text-[#4a154b]">GEMRAKSHA</span>, we ensure that your precious gemstones and jewelry reach you safely and on time. We partner with trusted logistics providers to guarantee a secure and premium delivery experience for every order.
    </p>
    <div>
      <p className="text-[13px] font-bold text-[#4a154b] mb-3">Delivery Timeline</p>
      <div className="rounded-[14px] border border-[#e0d5cc] bg-[#fdf8f2] p-4">
        <div className="flex items-center gap-2 mb-1.5"><Clock size={14} strokeWidth={2} className="text-[#4a154b]" />
          <span className="text-[12px] font-bold text-[#251622]">Standard Processing</span></div>
        <p className="text-[12px] leading-relaxed text-[#666]">Our standard delivery timeline is <span className="font-bold text-[#4a154b]">7–8 working days</span> from the date of order confirmation.</p>
        <p className="mt-2 text-[11px] italic text-[#aaa]">*Custom jewelry orders may take additional time.</p>
      </div>
    </div>
    <div>
      <p className="text-[13px] font-bold text-[#4a154b] mb-3">Payment & COD</p>
      <div className="rounded-[14px] border border-red-100 bg-red-50 p-4 flex items-start gap-3">
        <CreditCard size={16} strokeWidth={2} className="text-red-400 flex-shrink-0 mt-0.5" />
        <p className="text-[12px] leading-relaxed text-[#666]"><span className="font-bold text-red-500">No Cash on Delivery (COD) available.</span> Due to the high value of our certified gemstones, we currently accept only prepaid orders via secure payment gateways.</p>
      </div>
    </div>
    <div>
      <p className="text-[13px] font-bold text-[#4a154b] mb-3">Shipping Partners</p>
      <div className="flex gap-3">
        {['Blue Dart', 'India Post'].map((p) => (
          <div key={p} className="flex-1 rounded-[12px] border border-[#e0d5cc] bg-[#fafafa] p-3 text-center">
            <Package size={18} strokeWidth={1.8} className="mx-auto mb-1.5 text-[#4a154b]" />
            <p className="text-[11px] font-semibold text-[#251622]">{p}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ReturnsContent = () => (
  <div className="space-y-4">
    <div className="rounded-[16px] border-2 border-red-200 bg-red-50 px-5 py-4 text-center">
      <RefreshCw size={22} strokeWidth={1.8} className="mx-auto mb-2 text-red-400" />
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-400">Important Notice</p>
      <h2 className="mt-1.5 font-serif text-[20px] font-bold text-[#251622]">No Returns or Exchanges</h2>
    </div>
    <p className="text-[13px] leading-relaxed text-[#666]">At GEMRAKSHA, we pride ourselves on creating bespoke jewelry and sourcing unique gemstones tailored specifically to your desires. Due to the custom nature of our manufacturing process, please review our detailed policy below.</p>
    {[
      { icon: Gem, title: 'Custom Manufacturing', body: 'Every piece is handcrafted specifically for you. Once an order is placed and production begins, cancellations cannot be accepted.' },
      { icon: ShieldAlert, title: 'Quality Assurance', body: 'We guarantee the authenticity of our gemstones. Each item undergoes rigorous inspection before shipping to ensure it meets our luxury standards.' },
      { icon: Package, title: 'Damaged Items', body: 'In the unlikely event your jewelry arrives damaged, please contact our concierge within 24 hours of delivery with photographic evidence.' },
    ].map(({ icon: Icon, title, body }) => (
      <div key={title} className="rounded-[14px] border border-[#e0d5cc] bg-[#fdf8f2] p-4">
        <div className="flex items-center gap-2 mb-1.5"><Icon size={15} strokeWidth={2} className="text-[#4a154b]" />
          <p className="text-[13px] font-bold text-[#251622]">{title}</p></div>
        <p className="text-[12px] leading-relaxed text-[#666]">{body}</p>
      </div>
    ))}
    <button type="button" className="w-full rounded-full bg-[#4a154b] py-3.5 text-[13px] font-bold text-white">Contact Concierge</button>
  </div>
);

const DisclaimerContent = () => {
  const [agreed, setAgreed] = useState(false);
  return (
    <div>
      <div className="text-center mb-5">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d0a061] bg-[#fdf8f2]">
          <Gem size={24} strokeWidth={1.5} className="text-[#d0a061]" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a154b]">GEMRAKSHA</p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#aaa]">Certified Luxury Gemstones</p>
        <h2 className="mt-4 font-serif text-[18px] font-bold text-[#251622]">Important Information</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-[#888]">Please review the following policies regarding our natural gemstones and jewelry crafting process.</p>
      </div>
      <div className="divide-y divide-gray-100 rounded-[16px] border border-gray-100 bg-white overflow-hidden mb-5">
        {['Color & Weight Variations', 'Gold Rate Fluctuations', 'Final Order Confirmation', 'Shipping & Insurance'].map((p) => (
          <div key={p} className="flex items-center justify-between px-5 py-4">
            <span className="text-[13px] font-medium text-[#251622]">{p}</span>
            <ChevronDown size={15} strokeWidth={2} className="text-[#aaa]" />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setAgreed(true)}
        className={`w-full rounded-full py-4 text-[13px] font-bold transition-all ${agreed ? 'bg-green-500 text-white' : 'bg-[#d0a061] text-white'}`}>
        {agreed ? '✓ Agreed' : 'I Understand & Agree'}
      </button>
      <p className="mt-2 text-center text-[10px] text-[#bbb]">Last updated: October 23, 2023</p>
    </div>
  );
};

const TermsContent = () => (
  <div>
    <div className="flex items-center gap-2 mb-2"><FileText size={16} strokeWidth={2} className="text-[#4a154b]" />
      <h2 className="font-serif text-[18px] font-bold text-[#251622]">Legal Information</h2></div>
    <div className="flex items-center gap-2 mb-5"><CheckCircle size={13} strokeWidth={2} className="text-[#d0a061]" />
      <p className="text-[11px] text-[#aaa]">Effective Date: October 24, 2023</p></div>
    <p className="text-[13px] leading-relaxed text-[#666] mb-5">Welcome to GEMRAKSHA. These terms govern your use of our luxury gemstone e-commerce platform. By using our services, you agree to be bound by these terms.</p>
    <div className="space-y-5">
      {[
        { n: 1, title: 'General Provisions', body: 'GEMRAKSHA operates as certified high-value gemstone dealers. We ensure that all descriptions, images, and prices are accurate; however, errors may occur. We reserve the right to correct any errors and to update information at any time without prior notice.' },
        { n: 2, title: 'Pricing & Modifications', body: 'Prices for our products are subject to change without notice due to market fluctuations in precious stones and metals. We shall not be liable to you or any third-party for any modification, price change, suspension, or discontinuance of the Service.' },
        { n: 3, title: 'Payment Terms', body: 'We accept major credit cards, secure bank transfers, and verified digital wallets. For high-value transactions exceeding ₹1,00,000, additional identity verification may be required to prevent fraud.' },
        { n: 4, title: 'Custom Orders', body: 'Custom pieces are created specifically for you. As such, these items are non-refundable and non-exchangeable once production has commenced. A 50% non-refundable deposit is required to begin any custom work.' },
        { n: 5, title: 'Certification & Authenticity', body: 'Every gemstone is accompanied by a certificate of authenticity from recognized laboratories (GIA, IGI, or similar). Returns will only be accepted if the item\'s condition matches the original shipment and includes all original documentation intact.' },
      ].map(({ n, title, body }) => (
        <div key={n} className="flex items-start gap-3">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#f3edf5] text-[11px] font-bold text-[#4a154b]">{n}</span>
          <div><p className="text-[14px] font-bold text-[#251622] mb-1">{title}</p>
            <p className="text-[12px] leading-relaxed text-[#666]">{body}</p></div>
        </div>
      ))}
    </div>
    <button type="button" className="mt-6 w-full rounded-full bg-[#4a154b] py-3.5 text-[13px] font-bold text-white">Have legal questions? Contact Support</button>
  </div>
);

const PrivacyContent = () => (
  <div>
    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d0a061] mb-1">Updated Oct 2023</p>
    <h2 className="font-serif text-[24px] font-bold text-[#4a154b] leading-tight mb-3">Privacy Policy</h2>
    <p className="text-[13px] leading-relaxed text-[#666] mb-5">At GEMRAKSHA, the trust you place in us is as precious as the gems we curate. We are committed to protecting your privacy with the highest standards of security.</p>
    <div className="divide-y divide-gray-100">
      <Accordion label="Data Collection" icon={Info}>We collect personal information such as your name, email address, shipping address, and phone number when you place an order or register for an account. We use this to process orders, communicate with you, and improve our services.</Accordion>
      <Accordion label="Payment Security" icon={Lock}>All payment information is encrypted using industry-standard SSL technology. We do not store your credit card details on our servers. Payments are processed through PCI-compliant gateways.</Accordion>
      <Accordion label="Email Communication" icon={Mail}>By placing an order, you agree to receive order confirmation and tracking emails. You may opt out of promotional emails at any time by clicking the unsubscribe link.</Accordion>
      <Accordion label="Cookies & Tracking" icon={Cookie}>We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.</Accordion>
    </div>
    <button type="button" className="mt-6 w-full rounded-full bg-[#4a154b] py-3.5 text-[13px] font-bold text-white">Contact Privacy Officer</button>
  </div>
);

/* ────────────────────────────────── MENU CONFIG ──────────────────────────────────── */

const MENU_ITEMS: Array<{ icon: any; label: string; sub: SubPage; desc: string }> = [
  { icon: Search,      label: 'Help & FAQs',       sub: 'faq',        desc: 'Find answers fast' },
  { icon: Truck,       label: 'Shipping Policy',    sub: 'shipping',   desc: 'Delivery & timelines' },
  { icon: RefreshCw,   label: 'Return Policy',      sub: 'returns',    desc: 'No returns on custom' },
  { icon: ShieldAlert, label: 'Disclaimer',         sub: 'disclaimer', desc: 'Important notices' },
  { icon: FileText,    label: 'Terms & Conditions', sub: 'terms',      desc: 'Legal & usage terms' },
  { icon: Lock,        label: 'Privacy Policy',     sub: 'privacy',    desc: 'Your data, protected' },
];

const CONTENT_MAP: Record<SubPage, React.ReactNode> = {
  faq:        <HelpFAQContent />,
  shipping:   <ShippingContent />,
  returns:    <ReturnsContent />,
  disclaimer: <DisclaimerContent />,
  terms:      <TermsContent />,
  privacy:    <PrivacyContent />,
};

/* ────────────────────────────────── MAIN PAGE ──────────────────────────────────── */

const AccountPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = (searchParams.get('tab') as SubPage) || 'faq';
  // Desktop expects activeSub to match the tabParam
  const activeSub = tabParam;

  // Mobile only: whether a sub-page is "pushed" into view
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync mobileOpen if tab changes via direct link
  React.useEffect(() => {
    if (searchParams.get('tab')) {
      setMobileOpen(true);
    } else {
      setMobileOpen(false);
    }
  }, [searchParams]);

  const openSub = (sub: SubPage) => { setSearchParams({ tab: sub }); };
  const closeSub = () => { setSearchParams({}); };

  const setActiveSub = (sub: SubPage) => { setSearchParams({ tab: sub }); };

  return (
    <>
      {/* ══════════════════════ MOBILE LAYOUT ══════════════════════ */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {mobileOpen ? (
            <motion.div key="sub" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="min-h-screen bg-white pb-28">
              <MobileSubHeader title={MENU_ITEMS.find(m => m.sub === activeSub)?.label ?? ''} onBack={closeSub} />
              <div className="px-5 pt-5">{CONTENT_MAP[activeSub]}</div>
            </motion.div>
          ) : (
            <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="min-h-screen bg-[#f8f4ee] pb-28">
              {/* Mobile header */}
              <div className="bg-white border-b border-gray-100 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3edf5]">
                    <User size={22} strokeWidth={1.8} className="text-[#4a154b]" />
                  </div>
                  <div>
                    <p className="font-serif text-[18px] font-bold text-[#251622]">My Account</p>
                    <p className="text-[11px] text-[#aaa]">GEMRAKSHA · Certified Gems</p>
                  </div>
                </div>
              </div>
              <div className="mx-4 mt-5 overflow-hidden rounded-[20px] bg-white shadow-[0_3px_16px_rgba(0,0,0,0.05)]">
                {MENU_ITEMS.map(({ icon: Icon, label, sub, desc }, i) => (
                  <button key={sub} type="button" onClick={() => openSub(sub)}
                    className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[#fdf8f2] active:bg-[#f3edf5] ${i < MENU_ITEMS.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#f3edf5]">
                      <Icon size={17} strokeWidth={2} className="text-[#4a154b]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-[#251622]">{label}</p>
                      <p className="text-[11px] text-[#aaa]">{desc}</p>
                    </div>
                    <ChevronRight size={16} strokeWidth={2} className="text-[#ccc]" />
                  </button>
                ))}
              </div>
              <div className="mx-4 mt-4 rounded-[20px] border border-[#ead9c5] bg-white px-5 py-5 text-center">
                <Headset size={22} strokeWidth={1.8} className="mx-auto mb-2 text-[#d0a061]" />
                <p className="text-[14px] font-bold text-[#251622]">Need assistance?</p>
                <p className="mt-1 text-[12px] text-[#aaa]">Our gemologists are available 24/7</p>
                <button type="button" onClick={() => navigate('/contact')}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#4a154b] py-3.5 text-[13px] font-bold text-white">
                  <ExternalLink size={14} strokeWidth={2.5} /> Contact Support
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════════════════ DESKTOP LAYOUT ══════════════════════ */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-[1240px] px-6 py-12">
          {/* Page title */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3edf5]">
              <User size={26} strokeWidth={1.8} className="text-[#4a154b]" />
            </div>
            <div>
              <h1 className="font-serif text-[28px] font-bold text-[#251622]">My Account</h1>
              <p className="text-[13px] text-[#aaa]">GEMRAKSHA · Certified Luxury Gemstones</p>
            </div>
          </div>

          <div className="flex gap-8 items-start">
            {/* ── Sidebar ── */}
            <aside className="w-[260px] flex-shrink-0 sticky top-[88px]">
              <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_3px_20px_rgba(0,0,0,0.06)]">
                {MENU_ITEMS.map(({ icon: Icon, label, sub }, i) => (
                  <button key={sub} type="button" onClick={() => setActiveSub(sub)}
                    className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-all ${
                      activeSub === sub
                        ? 'bg-[#4a154b] text-white'
                        : 'text-[#251622] hover:bg-[#f3edf5]'
                    } ${i < MENU_ITEMS.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <Icon size={16} strokeWidth={2}
                      className={activeSub === sub ? 'text-[#d0a061]' : 'text-[#4a154b]'} />
                    <span className="text-[14px] font-semibold">{label}</span>
                    {activeSub === sub && <ChevronRight size={14} strokeWidth={2.5} className="ml-auto text-[#d0a061]" />}
                  </button>
                ))}
              </div>

              {/* Support card */}
              <div className="mt-4 rounded-[20px] border border-[#ead9c5] bg-white px-5 py-5 text-center">
                <Headset size={20} strokeWidth={1.8} className="mx-auto mb-2 text-[#d0a061]" />
                <p className="text-[13px] font-bold text-[#251622]">Need help?</p>
                <p className="mt-1 text-[11px] text-[#aaa]">Available 24/7</p>
                <button type="button" onClick={() => navigate('/contact')}
                  className="mt-3 w-full rounded-full bg-[#4a154b] py-2.5 text-[12px] font-bold text-white">
                  Contact Support
                </button>
              </div>
            </aside>

            {/* ── Content panel ── */}
            <main className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div key={activeSub}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[24px] bg-white p-8 shadow-[0_3px_20px_rgba(0,0,0,0.06)]">
                  {CONTENT_MAP[activeSub]}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
