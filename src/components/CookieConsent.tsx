'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      // Small delay for dramatic effect
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary-only');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none flex justify-center">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-full max-w-4xl bg-slate-900/95 backdrop-blur-md border border-brand-cyan rounded-xl p-6 shadow-[0_0_30px_color-mix(in_srgb,var(--color-brand-cyan)_20%,transparent)] pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            {/* Subtle background scanner effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/5 to-transparent w-[200%]"
              animate={{ x: ["-100%", "50%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
            
            <div className="flex-1 relative z-10">
              <h3 className="text-xl font-bold text-brand-cyan mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                SYSTEM.PRIVACY_PROTOCOL
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                This digital interface utilizes local tracking nodes (cookies) to optimize your browsing experience, 
                maintain session integrity, and analyze traffic patterns. Do you authorize this connection?
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 relative z-10">
              <button 
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-4 py-2 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 rounded transition-colors text-xs font-bold tracking-wide whitespace-nowrap"
              >
                DECLINE
              </button>
              <button 
                onClick={handleNecessary}
                className="flex-1 sm:flex-none px-4 py-2 border border-brand-cyan/50 text-brand-cyan/80 hover:text-brand-cyan hover:border-brand-cyan hover:bg-brand-cyan/10 rounded transition-colors text-xs font-bold tracking-wide whitespace-nowrap"
              >
                ESSENTIALS ONLY
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-6 py-2 bg-brand-cyan/20 border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/30 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_50%,transparent)] rounded transition-all text-xs font-bold tracking-wide whitespace-nowrap"
              >
                AUTHORIZE ALL
              </button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-cyan"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-cyan"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-cyan"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-cyan"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
