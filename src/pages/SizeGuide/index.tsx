import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Info, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useUIStore } from '../../store/useStore';

const SizeGuide = () => {
  const navigate = useNavigate();
  const addToast = useUIStore((s) => s.addToast);

  return (
    <div className="min-h-screen bg-[#f8f4ee] pb-20">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-white px-5 py-4 shadow-sm border-b border-gray-100 flex items-center justify-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 text-[#251622] hover:bg-gray-50 p-2 rounded-full -ml-2 transition-colors"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
        <h1 className="font-serif text-[18px] font-bold text-[#251622] tracking-wide">
          Ring Size Guide
        </h1>
      </div>

      <div className="mx-auto max-w-[600px] px-5 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-serif text-[32px] font-bold leading-tight text-[#251622]">
            Find Your Perfect Fit
          </h2>
          <p className="mx-auto mt-4 max-w-[320px] text-[13px] leading-relaxed text-[#7a6b63]">
            Ensure your GEMRAKSHA ring fits comfortably by following our simple measuring guide.
          </p>
        </motion.div>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => addToast('Starting tutorial video...')}
          className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[16px] bg-[#eaddd1] shadow-sm group cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f679f4aa8?auto=format&fit=crop&q=80&w=1200"
            alt="Ring Sizing Tutorial"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white/40 backdrop-blur-sm border border-white/40 transition-transform group-hover:scale-110">
              <Play className="ml-1 fill-white text-white" size={20} />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 rounded-[6px] bg-black/50 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-white uppercase tracking-wide">
            Watch Tutorial
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <h3 className="font-serif text-[20px] font-bold text-[#251622]">
            How to Measure
          </h3>
          
          <div className="mt-5 flex flex-col gap-6">
            {/* Step 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#eab308] text-[12px] font-bold text-white mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-serif text-[15px] font-bold text-[#251622] leading-none">
                  Wrap a Strip of Paper
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[#8d8078] font-medium">
                  Wrap a thin strip of paper or string around the base of the finger you want to measure.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#eab308] text-[12px] font-bold text-white mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-serif text-[15px] font-bold text-[#251622] leading-none">
                  Mark the Overlap
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[#8d8078] font-medium">
                  Mark the point where the paper or string overlaps with a pen. Ensure it fits comfortably.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-start">
              <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#eab308] text-[12px] font-bold text-white mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-serif text-[15px] font-bold text-[#251622] leading-none">
                  Measure the Length
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[#8d8078] font-medium">
                  Measure the length of the marked paper in millimeters using a ruler.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <button 
            onClick={() => addToast('Size chart download started...')}
            className="flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#eab308] bg-transparent py-3.5 text-[12px] font-bold uppercase tracking-wide text-[#eab308] hover:bg-[#eab308]/5 active:scale-95 transition-all"
          >
            <Download size={14} strokeWidth={2.5} className="mt-[-1px]" />
            Download Printable Size Chart
          </button>
        </motion.div>

        {/* Note Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 mb-10 flex gap-3 rounded-[8px] border border-gray-200 bg-[#f5f4ef] p-5 shadow-sm items-start"
        >
          <Info className="shrink-0 text-[#eab308] mt-0.5" size={18} strokeWidth={2} />
          <div className="pt-[1px]">
            <h4 className="font-serif text-[14px] font-bold text-[#251622] leading-none mb-2">
              Custom Sizing Note
            </h4>
            <p className="text-[12.5px] leading-relaxed text-[#8d8078] font-medium">
              For custom sizes or if you are between sizes, we recommend visiting a local jeweler for professional sizing before placing your order to ensure the perfect fit for your GEMRAKSHA piece.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SizeGuide;
