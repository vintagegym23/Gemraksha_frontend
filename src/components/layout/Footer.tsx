import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Search, Truck, RefreshCw, ShieldAlert, FileText, Lock, ChevronRight } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop All', to: '/collection' },
  { label: 'Size Guide', to: '/size-guide' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog', to: '/blog' },
];

const policyLinks = [
  { label: 'Privacy Policy', to: '/policies/privacy' },
  { label: 'Terms of Service', to: '/policies/terms' },
  { label: 'Shipping Policy', to: '/policies/shipping' },
  { label: 'Return Policy', to: '/policies/returns' },
  { label: 'FAQs', to: '/faq' },
];

const accountLinks = [
  { icon: Search, label: 'Help & FAQs', path: '/account?tab=faq', desc: 'Find answers fast' },
  { icon: Truck, label: 'Shipping Policy', path: '/account?tab=shipping', desc: 'Delivery & timelines' },
  { icon: RefreshCw, label: 'Return Policy', path: '/account?tab=returns', desc: 'No returns on custom' },
  { icon: ShieldAlert, label: 'Disclaimer', path: '/account?tab=disclaimer', desc: 'Important notices' },
  { icon: FileText, label: 'Terms & Conditions', path: '/account?tab=terms', desc: 'Legal & usage terms' },
  { icon: Lock, label: 'Privacy Policy', path: '/account?tab=privacy', desc: 'Your data, protected' },
];

export const Footer = () => {
  return (
    <footer className="bg-[#f8f4ee] md:bg-white pt-2 pb-24 md:pt-20 md:pb-16 border-t border-gray-100">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        
        {/* MOBILE FOOTER REDESIGN */}
        <div className="md:hidden flex flex-col space-y-12">
          {/* Brand & Newsletter */}


          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-8 px-2">
            <div>
              <h3 className="text-[12px] font-bold text-[#aa7b43] mb-4 uppercase tracking-[0.15em]">Explore</h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-[14px] font-medium text-[#6b5d56] transition-colors hover:text-[#4a154b]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[12px] font-bold text-[#aa7b43] mb-4 uppercase tracking-[0.15em]">Support</h3>
              <ul className="space-y-4">
                {accountLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-[14px] font-medium text-[#6b5d56] transition-colors hover:text-[#4a154b]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="flex flex-col items-center pt-8 border-t border-[#ead9c5] space-y-6">
            <div className="flex items-center gap-5">
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#4a154b] shadow-sm transition-transform active:scale-90"><Instagram size={18} strokeWidth={2} /></a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#4a154b] shadow-sm transition-transform active:scale-90"><Facebook size={18} strokeWidth={2} /></a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#4a154b] shadow-sm transition-transform active:scale-90"><Youtube size={18} strokeWidth={2} /></a>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9d8d82]">
              © {new Date().getFullYear()} Gemraksha
            </p>
          </div>
        </div>

        {/* DESKTOP FOOTER */}
        <div className="hidden md:grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col items-center space-y-6 text-center sm:items-start sm:text-left">
            <Link to="/" className="inline-block font-serif text-3xl font-bold text-[#4a154b]">
              Gemraksha
            </Link>
            <p className="text-sm leading-relaxed text-[#6d5c52] max-w-sm">
              Your trusted destination for certified gemstones, authentic Rudrakshas, and spiritual jewelry. Illuminating lives with timeless energy.
            </p>
            <div className="flex items-center gap-4 py-2">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3f4f6] text-[#4a154b]/60 transition-all hover:bg-[#4a154b]/10">
                <Facebook size={18} strokeWidth={2.5} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3f4f6] text-[#4a154b]/60 transition-all hover:bg-[#4a154b]/10">
                <Instagram size={18} strokeWidth={2.5} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3f4f6] text-[#4a154b]/60 transition-all hover:bg-[#4a154b]/10">
                <Youtube size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:pl-8">
            <h3 className="text-xl font-serif font-bold text-[#4a154b] mb-6 md:mb-8">Quick Links</h3>
            <ul className="space-y-4 md:space-y-5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-medium text-[#666666] transition-colors hover:text-[#4a154b]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h3 className="text-xl font-serif font-bold text-[#4a154b] mb-6 md:mb-8">Policies</h3>
            <ul className="space-y-4 md:space-y-5">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-medium text-[#666666] transition-colors hover:text-[#4a154b]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="flex flex-col gap-6 md:gap-8 items-center text-center sm:items-start sm:text-left">
            <h3 className="text-xl font-serif font-bold text-[#4a154b] mb-2">Stay Updated</h3>
            <p className="text-sm text-[#666666] leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-14 px-6 rounded-[12px] border border-gray-200 text-sm focus:border-[#4a154b] focus:outline-none transition-colors border-solid"
                required
              />
              <button
                type="submit"
                className="w-full h-14 rounded-[12px] bg-[#4a154b] text-white text-[13px] font-bold tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:flex mt-16 md:mt-20 pt-8 md:pt-10 border-t border-gray-100 flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="text-[11px] font-medium tracking-wider text-[#9d8d82] text-center md:text-left">
            © {new Date().getFullYear()} Gemraksha. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-6 bg-[#fbf9f6] rounded border border-gray-50 shadow-sm" />
            <div className="w-10 h-6 bg-[#fbf9f6] rounded border border-gray-50 shadow-sm" />
            <div className="w-10 h-6 bg-[#fbf9f6] rounded border border-gray-50 shadow-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};
