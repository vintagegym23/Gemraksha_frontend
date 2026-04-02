import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageCircle, CalendarClock, ExternalLink } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f8f4ee] pb-28">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#4a154b] to-[#6b2070] px-6 pt-12 pb-14 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ecd0a1]/80 mb-3">Gemraksha Inc.</p>
          <h1 className="font-serif text-[2.4rem] leading-tight text-white mb-3">Get in Touch</h1>
          <p className="text-[13px] text-white/60 leading-relaxed max-w-[280px] mx-auto">
            We're here to help you find the perfect stone for your journey.
          </p>
        </motion.div>
      </div>

      <div className="px-5 -mt-6 space-y-4">

        {/* Owner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-[20px] bg-white shadow-[0_8px_32px_rgba(74,21,75,0.1)] border border-[#f0eaf5] overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#d0a061]/10 to-[#ecd0a1]/10 px-5 py-4 border-b border-[#f5eedc]">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d0a061]">Your Point of Contact</p>
          </div>
          <div className="px-5 py-5 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4a154b] to-[#6b2070] text-white font-serif text-xl shadow-md">
              A
            </div>
            <div>
              <p className="font-serif text-[18px] text-[#251622] leading-tight">Aravind</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d0a061] mt-0.5">Founder · Gemraksha Inc.</p>
              <p className="text-[11px] text-[#9d8fa0] mt-1">Certified Gemologist · Vedic Astrologer</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-[20px] bg-white shadow-[0_8px_32px_rgba(74,21,75,0.07)] border border-[#f0eaf5] overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-[#f5f0f8]">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8d7a8f]">Contact Details</p>
          </div>

          {/* Phone */}
          <a href="tel:+919966637182"
            className="flex items-center gap-4 px-5 py-4 border-b border-[#f5f0f8] active:bg-[#fdf8f2] transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ecd0a1]/20 text-[#d0a061]">
              <Phone size={18} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8d7a8f]">Phone</p>
              <p className="text-[15px] font-semibold text-[#251622] mt-0.5">+91 99666 37182</p>
            </div>
            <ExternalLink size={14} className="text-[#c5b0c8] shrink-0" strokeWidth={2} />
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/919966637182" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 px-5 py-4 border-b border-[#f5f0f8] active:bg-[#f0fdf4] transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle size={18} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8d7a8f]">WhatsApp</p>
              <p className="text-[15px] font-semibold text-[#251622] mt-0.5">+91 99666 37182</p>
            </div>
            <ExternalLink size={14} className="text-[#c5b0c8] shrink-0" strokeWidth={2} />
          </a>

          {/* Email */}
          <a href="mailto:info@gemraksha.com"
            className="flex items-center gap-4 px-5 py-4 active:bg-[#fdf8f2] transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4a154b]/8 text-[#4a154b]">
              <Mail size={18} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8d7a8f]">Email</p>
              <p className="text-[15px] font-semibold text-[#251622] mt-0.5">info@gemraksha.com</p>
            </div>
            <ExternalLink size={14} className="text-[#c5b0c8] shrink-0" strokeWidth={2} />
          </a>
        </motion.div>

        {/* Location & Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-[20px] bg-white shadow-[0_8px_32px_rgba(74,21,75,0.07)] border border-[#f0eaf5] overflow-hidden"
        >
          <div className="flex items-center gap-4 px-5 py-4 border-b border-[#f5f0f8]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ecd0a1]/20 text-[#d0a061]">
              <MapPin size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8d7a8f]">Location</p>
              <p className="text-[14px] font-semibold text-[#251622] mt-0.5">Hyderabad, Telangana</p>
              <p className="text-[11px] text-[#9d8fa0]">India · 500001</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4a154b]/8 text-[#4a154b]">
              <Clock size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8d7a8f]">Business Hours</p>
              <p className="text-[14px] font-semibold text-[#251622] mt-0.5">Mon – Sat, 9 AM – 7 PM</p>
              <p className="text-[11px] text-[#9d8fa0]">Sunday by appointment only</p>
            </div>
          </div>
        </motion.div>

        {/* Book a Call CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-[20px] bg-gradient-to-br from-[#4a154b] to-[#6b2070] p-5 shadow-[0_8px_32px_rgba(74,21,75,0.25)]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-[#ecd0a1]">
              <CalendarClock size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white leading-tight">Want a personalized consultation?</p>
              <p className="text-[11px] text-white/60 mt-0.5">Book a 1-on-1 call with our gemologist</p>
            </div>
          </div>
          <Link to="/book-call"
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#d0a061] py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_4px_14px_rgba(208,160,97,0.4)] active:scale-[0.98] transition-all">
            <CalendarClock size={15} strokeWidth={2.5} /> Book a Call
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
