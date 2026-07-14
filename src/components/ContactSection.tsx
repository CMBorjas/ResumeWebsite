"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { SiBluesky } from 'react-icons/si';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:C.mandujano.borjas@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full relative z-10 pt-24 pb-12 overflow-hidden bg-[#0a0f18] border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-brand-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      {/* TICKER TAPE MARQUEE */}
      <div className="w-full overflow-hidden whitespace-nowrap py-12 flex items-center border-y border-white/5 bg-white/[0.02]">
        <motion.div
          className="flex items-center gap-8 min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Duplicate content for seamless infinite scrolling */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-[12vw] md:text-[8vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-white drop-shadow-[0_0_15px_rgba(0,255,225,0.3)] tracking-tighter">
                LET'S TALK
              </span>
              <svg className="w-16 h-16 md:w-24 md:h-24 text-brand-pink mx-4 drop-shadow-[0_0_10px_rgba(255,100,200,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <span className="text-[12vw] md:text-[8vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-cyan drop-shadow-[0_0_15px_rgba(0,255,225,0.3)] tracking-tighter">
                LET'S WORK
              </span>
              <svg className="w-16 h-16 md:w-24 md:h-24 text-brand-pink mx-4 drop-shadow-[0_0_10px_rgba(255,100,200,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-6 mb-20 px-4">
        <p className="text-brand-pink text-xs md:text-sm uppercase tracking-[0.3em] font-bold">
          CONTACT ME NOW & GET IN TOUCH !
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* LEFT: Contact Info */}
          <div className="flex flex-col gap-12 justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-3">Phone Number</h3>
              <p className="text-slate-400 text-lg font-mono group-hover:text-brand-cyan transition-colors">+1 (555) 000-0000</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-3">Email</h3>
              <a href="mailto:C.mandujano.borjas@gmail.com" className="text-slate-400 text-lg group-hover:text-brand-pink transition-colors">
                C.mandujano.borjas@gmail.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-3">Location</h3>
              <p className="text-slate-400 text-lg group-hover:text-brand-cyan transition-colors">United States</p>
            </motion.div>
          </div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors duration-300"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-cyan group-hover:w-full transition-all duration-500 pointer-events-none" />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand-pink transition-colors duration-300"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-pink group-hover:w-full transition-all duration-500 pointer-events-none" />
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your Message"
                  rows={3}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors duration-300 resize-none custom-scrollbar"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-cyan group-hover:w-full transition-all duration-500 pointer-events-none" />
              </div>

              <button
                type="submit"
                className="mt-4 self-start bg-gradient-to-r from-brand-cyan to-[#7b2ff7] text-white font-bold py-4 px-10 rounded-full flex items-center gap-3 hover:scale-[1.02] hover:shadow-[0_0_20px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)] transition-all duration-300 tracking-wider text-sm uppercase"
              >
                Send Message
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* FOOTER */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} <span className="text-brand-cyan font-bold">Christian Mandujano Borjas</span> All Rights Reserved.
          </p>
          
          <div className="flex gap-6 items-center">
            <a href="https://github.com/CMBorjas" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-cyan hover:-translate-y-1 transition-all duration-300">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/christian-mandujano-borjas" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0077b5] hover:-translate-y-1 transition-all duration-300">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-[#05a0fa] hover:-translate-y-1 transition-all duration-300" title="Bluesky (Pending)">
              <SiBluesky className="w-5 h-5" />
            </a>
            <a href="mailto:C.mandujano.borjas@gmail.com" className="text-slate-400 hover:text-brand-pink hover:-translate-y-1 transition-all duration-300">
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
