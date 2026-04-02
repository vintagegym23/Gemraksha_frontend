import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Info, CheckCircle2, User, Phone, Mail } from 'lucide-react';

export const Contact = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(5);
  const [selectedTime, setSelectedTime] = useState<string | null>('10:30 AM');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Hardcoded calendar for October 2023 based on the design
  const daysInMonth = Array.from({ length: 20 }, (_, i) => i + 1);
  // Padding for the first row (starts on Wednesday in image)
  const paddingDays = [null, null, null]; 
  const allDays = [...paddingDays, ...daysInMonth];

  const timeSlots = [
    '09:00 AM', '10:30 AM', '01:00 PM',
    '02:30 PM', '04:00 PM', '05:30 PM'
  ];

  const disabledSlots = ['04:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !form.name || !form.phone) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] pb-32">
      <div className="w-full relative">
        
        {/* Header */}
        <div className="pt-8 px-6 pb-6 text-center relative">
          <div className="font-serif text-[1rem] tracking-[0.2em] font-bold text-[#251622] mb-6">
            GEMRAKSHA
          </div>
          <h1 className="font-serif text-[2.1rem] leading-tight text-[#251622] mb-3">
            Book a Private Viewing
          </h1>
          <p className="text-[12px] text-[#716863] leading-relaxed mx-auto max-w-[320px]">
            Experience our premium collection in a personalized 1-on-1 video session with a certified gemologist.
          </p>
        </div>

        <div className="px-5 space-y-7 pb-4">
          
          {/* Calendar Card */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03]">
            <div className="flex items-center justify-between mb-5 px-2">
              <button type="button" className="text-[#999] p-1"><ChevronLeft size={16} strokeWidth={3} /></button>
              <span className="font-bold text-[#251622] text-[14px]">October 2023</span>
              <button type="button" className="text-[#555] p-1"><ChevronRight size={16} strokeWidth={3} /></button>
            </div>
            
            <div className="grid grid-cols-7 text-center mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-[10px] font-bold text-[#888]">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-3 text-center text-[12px]">
              {allDays.map((day, i) => (
                <div key={i} className="flex justify-center items-center h-8">
                  {day ? (
                    <button
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`h-8 w-8 rounded-full flex items-center justify-center transition-all text-[12px] ${
                        selectedDate === day 
                          ? 'bg-[#d0a061] text-white font-bold shadow-md shadow-[#d0a061]/30' 
                          : 'text-[#251622] hover:bg-black/5'
                      }`}
                    >
                      {day}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="px-1">
            <h3 className="font-serif font-bold text-[#251622] text-[15px] mb-3">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-2.5">
              {timeSlots.map((time) => {
                const isDisabled = disabledSlots.includes(time);
                const isSelected = selectedTime === time;
                
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded-xl text-[11px] font-medium transition-all ${
                      isDisabled
                        ? 'border border-[#f0f0f0] text-[#ccc] bg-transparent cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'border border-[#d0a061] text-[#d0a061] bg-[#d0a061]/5 font-bold shadow-sm'
                        : 'border border-[#eaeaea] text-[#716863] bg-white hover:border-[#d0a061]/40'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Form */}
          <form id="booking-form" onSubmit={handleSubmit} className="px-1 space-y-3">
            <h3 className="font-serif font-bold text-[#251622] text-[15px] mb-3">Your Details</h3>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8a09b]">
                <User size={16} strokeWidth={2} />
              </div>
              <input 
                type="text" 
                required
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="Full Name" 
                className="w-full bg-white border border-[#eaeaea] rounded-[14px] py-4 pl-11 pr-4 text-[13px] text-[#251622] placeholder:text-[#b8b0ab] focus:outline-none focus:border-[#d0a061] transition-colors"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8a09b]">
                <Phone size={16} strokeWidth={2} />
              </div>
              <input 
                type="tel" 
                required
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                placeholder="Phone Number" 
                className="w-full bg-white border border-[#eaeaea] rounded-[14px] py-4 pl-11 pr-4 text-[13px] text-[#251622] placeholder:text-[#b8b0ab] focus:outline-none focus:border-[#d0a061] transition-colors"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8a09b]">
                <Mail size={16} strokeWidth={2} />
              </div>
              <input 
                type="email" 
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="Email Address (Optional)" 
                className="w-full bg-white border border-[#eaeaea] rounded-[14px] py-4 pl-11 pr-4 text-[13px] text-[#251622] placeholder:text-[#b8b0ab] focus:outline-none focus:border-[#d0a061] transition-colors"
              />
            </div>

            <div className="bg-[#f2ecdc] border border-[#e6decd] rounded-[14px] p-3.5 flex items-start gap-3 mt-4">
              <div className="text-[#c19954] mt-0.5 shrink-0">
                 <Info size={16} strokeWidth={2.5} />
              </div>
              <p className="text-[10px] text-[#716863] leading-relaxed">
                A zoom link will be sent to your provided number 15 minutes before the scheduled time.
              </p>
            </div>
          </form>

        </div>

        {/* Sticky Footer Button */}
        <div className="fixed bottom-[72px] left-0 right-0 p-5 bg-white border-t border-[#f0f0f0] shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key="success"
                className="w-full bg-[#1b4332] text-white py-4 rounded-[14px] flex items-center justify-center gap-2 font-bold text-[14px] shadow-lg"
              >
                <CheckCircle2 size={18} /> Booking Confirmed
              </motion.div>
            ) : (
              <motion.button
                key="submit"
                form="booking-form"
                type="submit"
                disabled={isSubmitting || !selectedDate || !selectedTime || !form.name || !form.phone}
                className="w-full bg-[#cda052] text-white py-4 rounded-[14px] flex items-center justify-center gap-2 font-bold text-[15px] shadow-[0_4px_14px_rgba(205,160,82,0.4)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none"
              >
                {isSubmitting ? (
                   <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Confirm Booking <ChevronRight size={18} strokeWidth={2.5} /></>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Contact;
