"use client";

import { FaCode, FaServer, FaNetworkWired, FaRocket } from 'react-icons/fa';

const goals = [
  {
    number: "01",
    title: "SOLVE COMPLEX PROBLEMS",
    description: "Pursuing a Computer Science degree with a strong foundation in Python, Java, and C++ to architect efficient and scalable software systems.",
    icon: <FaCode className="w-5 h-5 text-brand-cyan drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)]" />
  },
  {
    number: "02",
    title: "MASTER FULL-STACK ARCHITECTURE",
    description: "Continuously building modern web applications and expanding my expertise in database management and cloud platforms like AWS and Firebase.",
    icon: <FaServer className="w-5 h-5 text-brand-pink drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-pink)_80%,transparent)]" />
  },
  {
    number: "03",
    title: "LEVERAGE HANDS-ON EXPERIENCE",
    description: "Utilizing my professional IT background in hardware maintenance and networking to approach software engineering with a comprehensive, full-system perspective.",
    icon: <FaNetworkWired className="w-5 h-5 text-brand-cyan drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)]" />
  },
  {
    number: "04",
    title: "PUSH TECHNOLOGICAL BOUNDARIES",
    description: "Driven to continuously learn emerging technologies, contribute to impactful open-source projects, and architect innovative solutions for the future.",
    icon: <FaRocket className="w-5 h-5 text-brand-pink drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-pink)_80%,transparent)]" />
  }
];

export default function MyGoals() {
  return (
    <div className="p-8 h-full flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {goals.map((goal, idx) => (
          <div key={idx} className="flex items-start gap-5 group">
            <div className="text-4xl md:text-5xl font-black text-slate-800/80 font-sans select-none group-hover:text-white/20 transition-colors duration-500 mt-[-4px]">
              {goal.number}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase group-hover:text-brand-cyan transition-colors duration-300">
                  {goal.title}
                </h3>
                {goal.icon}
              </div>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {goal.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
