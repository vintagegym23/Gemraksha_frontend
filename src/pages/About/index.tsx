import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  ShieldCheck, Gem, Users, Award, Truck, Heart,
  MapPin, Star, ArrowRight, CheckCircle2,
} from 'lucide-react';

// Images
import aboutHero from '../../images/about_hero.png';
import rawGem    from '../../images/raw_gem.png';
import artisan   from '../../images/artisan.png';
import finishedRing from '../../images/finished_ring.png';

/* ─── Fade-up animation wrapper ─── */
const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = '',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Stat card ─── */
const Stat: React.FC<{ value: string; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
  <div className="flex flex-col items-center text-center gap-2 p-6">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d0a061]/15 text-[#d0a061] mb-1">
      {icon}
    </div>
    <span className="font-serif text-[2.4rem] leading-none text-white">{value}</span>
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">{label}</span>
  </div>
);

/* ─── Promise card ─── */
const PromiseCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; accent: string }> = ({
  icon, title, desc, accent,
}) => (
  <FadeUp>
    <div className={`group flex flex-col items-center text-center gap-4 rounded-3xl border border-white/60 bg-white p-8 shadow-[0_8px_32px_rgba(74,21,75,0.07)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(74,21,75,0.13)]`}>
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent} text-white shadow-md transition-transform duration-500 group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-[15px] font-bold uppercase tracking-[0.15em] text-[#251622]">{title}</h3>
      <p className="text-[13px] leading-relaxed text-[#8d8078]">{desc}</p>
    </div>
  </FadeUp>
);

/* ─── Process step ─── */
const ProcessStep: React.FC<{ num: string; img: string; label: string; desc: string; delay: number }> = ({
  num, img, label, desc, delay,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-5">
        <img src={img} alt={label} className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#d0a061] text-[11px] font-bold text-white shadow">
          {num}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="font-serif text-[1.3rem] text-white leading-tight">{label}</p>
        </div>
      </div>
      <p className="text-[13px] leading-relaxed text-[#7d6a6a] px-1">{desc}</p>
    </motion.div>
  );
};

/* ─── Team member ─── */
const TeamMember: React.FC<{ name: string; role: string; initials: string; color: string }> = ({
  name, role, initials, color,
}) => (
  <FadeUp>
    <div className="flex flex-col items-center text-center gap-3">
      <div className={`flex h-20 w-20 items-center justify-center rounded-full ${color} text-white text-xl font-serif shadow-lg`}>
        {initials}
      </div>
      <div>
        <p className="font-serif text-[16px] text-[#251622]">{name}</p>
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#d0a061] font-bold mt-0.5">{role}</p>
      </div>
    </div>
  </FadeUp>
);

/* ─── About Page ─── */
export const About = () => {
  return (
    <div className="min-h-screen bg-[#faf7f4] font-sans overflow-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[88vh] min-h-[500px] flex items-end overflow-hidden">
        <img
          src={aboutHero}
          alt="Gemraksha Atelier"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Decorative top label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            Est. 2010 · Hyderabad, India
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-[1100px] px-6 pb-20 md:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#d0a061] mb-4">Our Story</p>
            <h1 className="font-serif text-[3rem] md:text-[5rem] leading-[1.0] text-white mb-6 max-w-3xl">
              Crafted with<br />
              <span className="italic text-[#ecd0a1]">Purpose & Passion</span>
            </h1>
            <p className="max-w-xl text-[15px] text-white/70 leading-relaxed mb-8">
              From the ancient mines of the earth to your hands — every Gemraksha stone carries a story of devotion, heritage, and exceptional craftsmanship.
            </p>
            <Link
              to="/collection"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#d0a061] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(208,160,97,0.4)] hover:bg-[#b88c50] hover:scale-[1.03] transition-all"
            >
              Explore Collection <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#4a154b] via-[#5c1c5d] to-[#3a0e3b]">
        <div className="mx-auto max-w-[1100px] grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          <Stat value="1500+" label="Gems Certified" icon={<Gem size={20} strokeWidth={1.5} />} />
          <Stat value="16+"  label="Years of Legacy" icon={<Award size={20} strokeWidth={1.5} />} />
          <Stat value="98%"  label="Happy Customers" icon={<Heart size={20} strokeWidth={1.5} />} />
          <Stat value="12+"  label="Countries Served" icon={<MapPin size={20} strokeWidth={1.5} />} />
        </div>
      </section>

      {/* ══ MISSION ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1100px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d0a061] mb-4">Who We Are</p>
              <h2 className="font-serif text-[2.5rem] md:text-[3.2rem] leading-tight text-[#251622] mb-6">
                A Legacy Born<br />in the Heart of Hyderabad
              </h2>
              <div className="space-y-4 text-[14px] leading-relaxed text-[#6b5d56]">
                <p>
                  Founded in 2010, GEMRAKSHA was born from a lifelong devotion to the ancient art of gemology. Our founders, third-generation jewelers from Hyderabad the gem capital of the world set out to bring certified, ethically sourced stones directly to those who seek both beauty and spiritual alignment.
                </p>
                <p>
                  We believe a gemstone is not merely an adornment. It is a conduit for energy, a symbol of intention, and a piece of the Earth's most extraordinary artistry. Every stone we carry has been hand-selected, lab-certified, and energized with Vedic rituals.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-2.5">
                {['GIA & IGI Certified on every gemstone', 'Ethically sourced from responsible mines', 'Vedic energization before dispatch', 'Free insured shipping across India'].map(point => (
                  <div key={point} className="flex items-center gap-3 text-[13px] text-[#251622]">
                    <CheckCircle2 size={16} className="text-[#d0a061] flex-shrink-0" strokeWidth={2} />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(74,21,75,0.18)]">
                <img src={artisan} alt="Master artisan at work" className="h-full w-full object-cover" />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-6 py-4 shadow-[0_12px_40px_rgba(74,21,75,0.14)] border border-[#f0eaf5]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4a154b] text-white">
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#251622]">Master Certified</p>
                    <p className="text-[11px] text-[#999]">GIA · IGI · GRS Standards</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ OUR PROMISE ══════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-[#f5eff9] to-[#faf7f4] py-24">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <FadeUp className="text-center mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d0a061] mb-3">Why Choose Us</p>
            <h2 className="font-serif text-[2.5rem] md:text-[3rem] text-[#251622]">The Gemraksha Promise</h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PromiseCard
              icon={<ShieldCheck size={24} strokeWidth={1.8} />}
              title="100% Certified"
              desc="Every gem arrives with an internationally recognized certificate of authenticity GIA, IGI, or GRS certified."
              accent="bg-gradient-to-br from-[#4a154b] to-[#6b2070]"
            />
            <PromiseCard
              icon={<Gem size={24} strokeWidth={1.8} />}
              title="Hand-Selected Stones"
              desc="Our master gemologist personally inspects every stone for color, cut, clarity and carat before it enters our collection."
              accent="bg-gradient-to-br from-[#d0a061] to-[#b88c50]"
            />
            <PromiseCard
              icon={<Users size={24} strokeWidth={1.8} />}
              title="Expert Astrology Team"
              desc="Our in-house Vedic astrologers guide you to the right gemstone based on your birth chart for maximum astrological benefit."
              accent="bg-gradient-to-br from-[#4a154b] to-[#6b2070]"
            />
            <PromiseCard
              icon={<Truck size={24} strokeWidth={1.8} />}
              title="Insured Delivery"
              desc="Every order is fully insured and shipped in a premium tamper-proof package with real-time tracking included."
              accent="bg-gradient-to-br from-[#d0a061] to-[#b88c50]"
            />
            <PromiseCard
              icon={<Heart size={24} strokeWidth={1.8} />}
              title="7-Day Returns"
              desc="Not satisfied? Return your purchase within 7 days in original condition with certification for a full, hassle-free refund."
              accent="bg-gradient-to-br from-[#4a154b] to-[#6b2070]"
            />
            <PromiseCard
              icon={<Award size={24} strokeWidth={1.8} />}
              title="Lifetime Support"
              desc="Our gemologists are available post-purchase for re-certification, re-energization, and ongoing astrological guidance."
              accent="bg-gradient-to-br from-[#d0a061] to-[#b88c50]"
            />
          </div>
        </div>
      </section>

      {/* ══ THE PROCESS ══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1100px] px-6 py-24 md:px-10 md:py-32">
        <FadeUp className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d0a061] mb-3">Our Craft</p>
            <h2 className="font-serif text-[2.5rem] md:text-[3rem] text-[#251622]">From Mine to You</h2>
          </div>
          <p className="max-w-sm text-[13px] text-[#8d8078] leading-relaxed italic">
            "We oversee every step from ethical sourcing to the final Vedic energization that leaves our atelier."
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProcessStep
            num="01" img={rawGem} label="Ethical Sourcing"
            desc="We partner exclusively with conflict-free mines in Sri Lanka, Burma, Zambia and Nepal. Every gem is traceable to its origin."
            delay={0}
          />
          <ProcessStep
            num="02" img={artisan} label="Master Cutting"
            desc="Our artisans with 20+ years of experience cut each stone to maximize its spiritual energy and optical brilliance simultaneously."
            delay={0.12}
          />
          <ProcessStep
            num="03" img={finishedRing} label="Vedic Energization"
            desc="Before dispatch, each stone undergoes a traditional Vedic puja ritual charged under specific planetary alignments for maximum potency."
            delay={0.24}
          />
        </div>
      </section>

      {/* ══ TEAM ═════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <FadeUp className="text-center mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d0a061] mb-3">The People</p>
            <h2 className="font-serif text-[2.5rem] md:text-[3rem] text-[#251622]">Meet Our Experts</h2>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <TeamMember name="Rajesh Verma"    role="Master Gemologist"      initials="RV" color="bg-gradient-to-br from-[#4a154b] to-[#6b2070]" />
            <TeamMember name="Priya Sharma"    role="Vedic Astrologer"        initials="PS" color="bg-gradient-to-br from-[#d0a061] to-[#b88c50]" />
            <TeamMember name="Arjun Mehta"     role="Chief Artisan"           initials="AM" color="bg-gradient-to-br from-[#4a154b] to-[#6b2070]" />
            <TeamMember name="Sunita Jain"     role="Sourcing Director"       initials="SJ" color="bg-gradient-to-br from-[#d0a061] to-[#b88c50]" />
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIAL STRIP ════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#4a154b] via-[#5c1c5d] to-[#3a0e3b] py-20">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <div className="flex justify-center mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-[#d0a061]" fill="#d0a061" strokeWidth={0} />
            ))}
          </div>
          <blockquote className="font-serif text-[1.5rem] md:text-[2rem] italic text-white leading-snug mb-6">
            "The Blue Sapphire I received was beyond stunning. The certification, the energization letter, and the packaging every detail felt premium and thoughtful."
          </blockquote>
          <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#d0a061]">
            Meera R. · Bangalore
          </p>
        </div>
      </section>

      {/* ══ CTA FOOTER ═══════════════════════════════════════════════════════ */}
      <section className="py-28 text-center px-6">
        <FadeUp>
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#d0a061] mb-4">Begin Your Journey</p>
          <h2 className="font-serif text-[2.8rem] md:text-[4rem] text-[#251622] leading-tight mb-6">
            Find Your<br />
            <span className="italic text-[#4a154b]">Perfect Stone</span>
          </h2>
          <p className="max-w-md mx-auto text-[14px] text-[#8d8078] leading-relaxed mb-10">
            Every gemstone has a story. Let our experts guide you to the one that aligns with your destiny, birth chart, and intention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collection"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4a154b] to-[#6b2070] px-10 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(74,21,75,0.35)] hover:shadow-[0_12px_32px_rgba(74,21,75,0.45)] hover:scale-[1.03] transition-all"
            >
              Shop Collection <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#4a154b] px-10 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[#4a154b] hover:bg-[#4a154b] hover:text-white transition-all"
            >
              Talk to an Expert
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ══ BRAND FOOTER ═════════════════════════════════════════════════════ */}
      <div className="flex flex-col items-center py-16 border-t border-[#f0eaf5]">
        <h4 className="text-[2.5rem] font-serif text-[#4a154b] tracking-[0.05em] mb-1 leading-none">Gemraksha</h4>
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#c5b0c8]">Certified Luxury Gemstones</span>
      </div>
    </div>
  );
};

export default About;
