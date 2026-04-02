import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Info, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Pick up the amount from URL, fallback to the one in the mockup
  const totalAmount = params.get('amount') ? `₹${params.get('amount')}` : '$2,450.00';
  const orderId = params.get('order') ?? `#GEM-102452`;

  return (
    <div className="flex min-h-screen flex-col bg-white pb-24">
      {/* ─── HEADER ─── */}
      <div className="flex items-center justify-between px-5 pt-8 pb-4 bg-white relative">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center text-[#251622] -ml-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <h1 className="text-[15px] font-serif font-bold text-[#251622] tracking-wide relative top-[1px]">
          Checkout
        </h1>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-[#251622] -mr-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <Info size={18} strokeWidth={2} />
        </button>
      </div>

      {/* ─── BODY ─── */}
      <div className="flex flex-1 flex-col items-center justify-start px-6 pt-16 text-center max-w-[420px] mx-auto w-full">

        {/* Animated Icon */}
        <div className="relative flex items-center justify-center h-32 w-32 shrink-0">
          {/* Subtle radiating rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.2 + i * 0.2 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d0a061]/80"
              style={{ width: `${60 + i * 16}px`, height: `${60 + i * 16}px` }}
            />
          ))}

          {/* Center core */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 14, delay: 0.1 }}
            className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#fdfaf7] border border-[#eaddd1] shadow-sm shrink-0"
          >
            {/* Hexagon Shield SVG */}
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 1L2 5V11C2 16.5 6 21.5 11 23C16 21.5 20 16.5 20 11V5L11 1Z"
                fill="#faeaea"
                stroke="#8d2626"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8 9L14 15M14 9L8 15" stroke="#8d2626" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 font-serif text-[22px] font-bold text-[#251622] tracking-wide shrink-0"
        >
          Payment Unsuccessful
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-3 text-[13px] leading-relaxed text-[#7a6b63] shrink-0"
        >
          We were unable to process your transaction. Please check your payment
          details and try again, or contact your bank.
        </motion.p>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 w-full rounded-2xl bg-[#f8f6f0] border border-[#f0ebe3] overflow-hidden shadow-sm shrink-0"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8d8078]">
              Total Amount
            </span>
            <span className="text-[14px] font-bold text-[#4a154b]">{totalAmount}</span>
          </div>
          <div className="h-[1px] w-full bg-[#f0ebe3]" />
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8d8078]">
              Order ID
            </span>
            <span className="text-[13px] font-semibold text-[#251622] tracking-wider uppercase">{orderId}</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 w-full space-y-4 shrink-0"
        >
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#4a154b] py-4 text-[13px] font-bold text-white shadow-md transition-all hover:bg-[#340e34] active:scale-[0.98]"
          >
            <RotateCcw size={16} strokeWidth={2.5} className="mt-[-1px]" />
            Retry Payment
          </button>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-[#d0a061] py-3.5 bg-white text-[13px] font-bold text-[#d0a061] transition-all hover:bg-[#d0a061]/5 active:scale-[0.98]"
          >
            Back to Cart
          </button>
        </motion.div>

        {/* Support link */}
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          onClick={() => navigate('/contact')}
          className="mt-8 text-[11px] font-medium text-[#8d8078] underline-offset-4 hover:text-[#4a154b] hover:underline transition-colors"
        >
          Need help? Contact Support
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentFailed;
