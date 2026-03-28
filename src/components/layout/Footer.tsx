import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-24 md:pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-primary">
              GEMRAKSHA
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Exquisite gemstones curated for the discerning collector. Experience the brilliance of nature's finest treasures.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/collection" className="text-gray-500 hover:text-primary text-sm transition-colors">All Collections</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-primary text-sm transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-primary text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-primary text-sm transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest">Policies</h4>
            <ul className="space-y-4">
              <li><Link to="/policies/shipping" className="text-gray-500 hover:text-primary text-sm transition-colors">Shipping Policy</Link></li>
              <li><Link to="/policies/returns" className="text-gray-500 hover:text-primary text-sm transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/policies/privacy" className="text-gray-500 hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/policies/terms" className="text-gray-500 hover:text-primary text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-500 text-sm">
                <MapPin size={18} className="text-gold shrink-0" />
                <span>123 Luxury Lane, Gem District, Jaipur, India</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500 text-sm">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500 text-sm">
                <Mail size={18} className="text-gold shrink-0" />
                <span>concierge@gemraksha.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} GEMRAKSHA. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
