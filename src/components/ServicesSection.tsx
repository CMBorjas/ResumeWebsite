"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlug, FaDatabase, FaBug, FaRocket, FaShieldAlt, FaServer, FaPlus } from 'react-icons/fa';

const services = [
  {
    id: '01',
    title: 'API INTEGRATION',
    description: 'Designing and implementing robust RESTful and GraphQL APIs to seamlessly connect frontend applications with complex backend services, ensuring secure and efficient data flow.',
    icon: <FaPlug className="w-6 h-6" />
  },
  {
    id: '02',
    title: 'DATABASE MANAGEMENT',
    description: 'Architecting scalable database solutions using SQL and NoSQL technologies like PostgreSQL, MySQL, and MongoDB. Focusing on query optimization, data integrity, and high availability.',
    icon: <FaDatabase className="w-6 h-6" />
  },
  {
    id: '03',
    title: 'FIX BUGS',
    description: 'Systematically diagnosing and resolving complex software defects. Utilizing advanced debugging tools and writing comprehensive tests to ensure long-term application stability.',
    icon: <FaBug className="w-6 h-6" />
  },
  {
    id: '04',
    title: 'OPTIMIZE PERFORMANCE',
    description: 'Profiling and enhancing application performance across the stack. From minimizing frontend render cycles to optimizing backend algorithms and reducing network latency.',
    icon: <FaRocket className="w-6 h-6" />
  },
  {
    id: '05',
    title: 'SECURITY',
    description: 'Implementing industry-standard security practices including OAuth2 authentication, role-based access control, data encryption, and protection against common web vulnerabilities.',
    icon: <FaShieldAlt className="w-6 h-6" />
  },
  {
    id: '06',
    title: 'SYSTEM DESIGN',
    description: 'Planning scalable, distributed architectures for high-traffic applications. Leveraging microservices, containerization, and cloud infrastructure.',
    icon: <FaServer className="w-6 h-6" />
  }
];

export default function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full py-24 flex flex-col items-center border-t border-brand-cyan/10 mt-16">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-slate-500 tracking-[0.2em] text-sm md:text-base uppercase mb-4">What I Offer</p>
        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight uppercase">Services</h2>
      </div>

      {/* Accordion List */}
      <div className="w-full max-w-5xl space-y-4 px-4 md:px-0">
        {services.map((service) => {
          const isOpen = openId === service.id;
          return (
            <div 
              key={service.id} 
              className={`w-full rounded-3xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-[#111827]' : 'bg-[#0a0f18] hover:bg-[#111827]'}`}
            >
              <button
                onClick={() => toggle(service.id)}
                className="w-full px-4 py-5 md:px-8 md:py-8 flex items-center justify-between focus:outline-none"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  {/* Icon Box */}
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex shrink-0 items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-brand-cyan/20' : 'bg-black/50'}`}>
                    <div className={`transition-colors duration-300 ${isOpen ? 'text-brand-cyan drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)]' : 'text-slate-400'}`}>
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Title & Number */}
                  <div className="flex flex-col items-start">
                    <span className="text-slate-500 font-bold text-xs md:text-sm mb-1">{service.id}</span>
                    <h3 className="text-lg md:text-2xl font-bold text-white tracking-wider uppercase text-left">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Plus Icon */}
                <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center transition-all duration-300 ${isOpen ? 'bg-brand-cyan/20' : 'bg-white/5'}`}>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`${isOpen ? 'text-brand-cyan drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)]' : 'text-white'}`}
                  >
                    <FaPlus className="w-4 h-4" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-4 pb-8 md:px-[112px] md:pb-10 pt-0 text-slate-400 leading-relaxed text-sm md:text-base">
                      <div className="pt-4 border-t border-white/5">
                        {service.description}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
