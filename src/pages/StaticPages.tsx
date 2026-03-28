import React from 'react';

const SimplePage = ({ title, content }: { title: string; content: string }) => (
  <div className="container mx-auto px-4 py-20 space-y-8 max-w-3xl">
    <h1 className="text-4xl font-serif font-bold uppercase tracking-widest text-center">{title}</h1>
    <div className="prose prose-luxury mx-auto text-gray-500 font-light leading-relaxed space-y-6">
      <p>{content}</p>
      <p>
        At GEMRAKSHA, we believe that every gemstone is a masterpiece of nature. Our mission is to bring these rare treasures to you with the highest standards of quality, ethics, and transparency.
      </p>
      <p>
        Each stone in our collection is hand-selected by our expert gemologists and comes with international certification from GIA or IGI, ensuring its authenticity and value.
      </p>
    </div>
  </div>
);

export const About = () => <SimplePage title="Our Story" content="Founded in the heart of Jaipur, the gemstone capital of the world, GEMRAKSHA represents a legacy of excellence in fine jewelry and rare stones." />;
export const Contact = () => <SimplePage title="Contact Us" content="Our concierge team is available 24/7 to assist you with your gemstone selection. Reach out to us for private consultations or inquiries." />;
export const FAQ = () => <SimplePage title="FAQs" content="Find answers to common questions about our gemstones, certification, shipping, and more." />;
export const Policies = () => <SimplePage title="Our Policies" content="Learn about our commitment to secure shipping, easy returns, and your privacy." />;
