'use client';

import React, { useState } from 'react';
import RestrictedTextarea from '../../components/RestrictedTextarea';
import Accordion from '../../components/Accordion';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const faqItems = [
    {
      id: 'faq-1',
      title: 'What services do you offer?',
      content: 'I specialize in full-stack web development, building high-performance, accessible, and dynamic applications. I also have experience in UI/UX design and setting up CI/CD pipelines.'
    },
    {
      id: 'faq-2',
      title: 'Are you available for freelance work?',
      content: 'Yes, I am currently open to freelance opportunities and contract work. Feel free to use the contact form to discuss your project requirements.'
    },
    {
      id: 'faq-3',
      title: 'What is your typical response time?',
      content: 'I aim to respond to all inquiries within 24-48 hours during regular business days.'
    }
  ];

  return (
    <section className="max-w-4xl mx-auto pt-8 space-y-12 pb-16">
      <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-8 border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_30%,transparent)] relative overflow-hidden group">
        {/* Glow indicator on hover */}
        <div className="absolute inset-0 border-2 border-brand-cyan opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-xl"></div>

        <h2 className="text-3xl font-bold text-brand-cyan drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)] tracking-wide mb-6">
          <span className="text-white mr-2">&gt;</span> SYSTEM.CONTACT
        </h2>
        
        <p className="text-slate-300 mb-8 leading-relaxed">
          Initialize a secure connection to my primary inbox. All fields marked with an asterisk (<span className="text-brand-pink">*</span>) are required for proper routing.
        </p>

        {isSubmitted ? (
          <div className="bg-brand-cyan/10 border border-brand-cyan p-6 rounded-lg text-center animate-in fade-in duration-500">
            <svg className="w-16 h-16 text-brand-cyan mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">TRANSMISSION SUCCESSFUL</h3>
            <p className="text-slate-300">Your message has been encrypted and delivered. I will respond shortly.</p>
            <button 
              onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
              className="mt-6 px-6 py-2 bg-brand-cyan/20 border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/30 rounded transition-all text-sm font-bold tracking-wide"
            >
              INITIALIZE NEW MESSAGE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold text-slate-300 tracking-widest uppercase flex justify-between items-end">
                  <span>Name <span className="text-brand-pink ml-1">*</span></span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-[#0d1117]/80 text-slate-200 placeholder:text-slate-600 p-4 rounded-lg border border-brand-cyan/30 focus:border-brand-cyan focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)] outline-none transition-all duration-300 font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-slate-300 tracking-widest uppercase flex justify-between items-end">
                  <span>Email <span className="text-brand-pink ml-1">*</span></span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-[#0d1117]/80 text-slate-200 placeholder:text-slate-600 p-4 rounded-lg border border-brand-cyan/30 focus:border-brand-cyan focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)] outline-none transition-all duration-300 font-mono text-sm"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-bold text-slate-300 tracking-widest uppercase flex justify-between items-end">
                <span>Subject <span className="text-brand-pink ml-1">*</span></span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
                className="w-full bg-[#0d1117]/80 text-slate-200 placeholder:text-slate-600 p-4 rounded-lg border border-brand-cyan/30 focus:border-brand-cyan focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)] outline-none transition-all duration-300 font-mono text-sm"
              />
            </div>

            <RestrictedTextarea
              id="message"
              name="message"
              label="Message"
              placeholder="Enter your transmission data here..."
              maxLength={1000}
              rows={6}
              required
              value={formData.message}
              onChange={handleChange}
            />

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-brand-cyan/10 border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan/20 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_50%,transparent)] hover:text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  PROCESSING...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  TRANSMIT DATA
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-8 border border-brand-cyan/20 relative overflow-hidden group">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
