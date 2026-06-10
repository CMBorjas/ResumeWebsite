'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((itemId) => itemId !== id));
    } else {
      if (allowMultiple) {
        setOpenItems([...openItems, id]);
      } else {
        setOpenItems([id]);
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <div 
            key={item.id} 
            className={`border border-brand-cyan/30 rounded-lg overflow-hidden transition-all duration-300 bg-[#0d1117] ${
              isOpen ? 'border-brand-cyan/80 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_20%,transparent)]' : 'hover:border-brand-cyan/50'
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 flex justify-between items-center bg-slate-900/50 hover:bg-brand-cyan/5 transition-colors focus:outline-none focus:bg-brand-cyan/10"
            >
              <h3 className="font-bold text-slate-200 text-left text-lg tracking-wide group-hover:text-brand-cyan transition-colors">
                <span className="text-brand-cyan mr-2 opacity-70">&gt;</span>
                {item.title}
              </h3>
              <motion.div 
                className="text-brand-cyan"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 text-slate-300 border-t border-brand-cyan/20 bg-[#0d1117]/80 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
