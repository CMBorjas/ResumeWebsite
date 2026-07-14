"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '../lib/projects';
import WeatherWidget from './WeatherWidget';
import { 
  FaPython, FaJava, FaReact, FaNodeJs, FaDocker, FaAws, FaLinux, FaRust, FaChartBar
} from 'react-icons/fa';
import { 
  SiCplusplus, SiTypescript, SiNextdotjs, SiTailwindcss, SiMysql, SiLangchain, SiFlask, SiSqlite, SiNumpy, SiFramer
} from 'react-icons/si';

const getTechIconAndColor = (tech: string) => {
  const lower = tech.toLowerCase();
  switch (lower) {
    case 'python': return { Icon: FaPython, color: '#FFD43B' };
    case 'java': return { Icon: FaJava, color: '#ED8B00' };
    case 'c++': case 'cpp': return { Icon: SiCplusplus, color: '#00599C' };
    case 'typescript': return { Icon: SiTypescript, color: '#3178C6' };
    case 'next.js': case 'nextjs': return { Icon: SiNextdotjs, color: '#FFFFFF' };
    case 'react': return { Icon: FaReact, color: '#61DAFB' };
    case 'tailwind': case 'tailwind css': case 'tailwindcss': return { Icon: SiTailwindcss, color: '#38BDF8' };
    case 'node.js': case 'nodejs': return { Icon: FaNodeJs, color: '#339933' };
    case 'mysql': return { Icon: SiMysql, color: '#4479A1' };
    case 'docker': return { Icon: FaDocker, color: '#2496ED' };
    case 'aws': return { Icon: FaAws, color: '#FF9900' };
    case 'linux': return { Icon: FaLinux, color: '#FCC624' };
    case 'rust': return { Icon: FaRust, color: '#DEA584' };
    case 'langchain': return { Icon: SiLangchain, color: '#10B981' };
    case 'flask': return { Icon: SiFlask, color: '#FFFFFF' };
    case 'sqlite': return { Icon: SiSqlite, color: '#44B4C1' };
    case 'numpy': return { Icon: SiNumpy, color: '#4DABCF' };
    case 'framer motion': return { Icon: SiFramer, color: '#0055FF' };
    case 'recharts': return { Icon: FaChartBar, color: '#22d3ee' };
    default: return { Icon: null, color: '#94a3b8' }; // slate-400
  }
}

/** Check if a project should render a live embedded widget instead of generic text */
const isWeatherProject = (project: Project) => project.title === 'Weather Widget';

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const renderCards = (list: Project[]) => (
    list.map((project, idx) => {
      const targetUrl = project.liveUrl || project.repoUrl || "#";
      const isLiveWidget = isWeatherProject(project);

      /* Weather Widget gets a special non-link card with the live component */
      if (isLiveWidget) {
        return (
          <div key={idx} className="block w-[280px] md:w-[320px] shrink-0 outline-none">
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-[#0a0f18]/80 backdrop-blur-xl border border-brand-cyan/20 rounded-3xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-full flex flex-col group hover:shadow-[0_0_30px_color-mix(in srgb, var(--color-brand-cyan) 15%, transparent)] hover:border-brand-cyan/40 transition-all duration-300 relative overflow-hidden min-h-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-2 relative z-10">
                <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors truncate">
                  {project.title}
                </h3>
                <span className="flex items-center gap-1.5 text-[10px] text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-2 py-0.5 font-bold tracking-wider shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]"></span>
                  </span>
                  LIVE
                </span>
              </div>

              {/* Live Weather Widget */}
              <div className="flex-1 relative z-10 overflow-hidden rounded-xl">
                <WeatherWidget isMaximized={false} />
              </div>
            </motion.div>
          </div>
        );
      }

      return (
        <Link 
          href={targetUrl} 
          target="_blank" 
          rel="noreferrer"
          key={idx}
          className="block w-[280px] md:w-[320px] shrink-0 outline-none"
        >
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-[#0a0f18]/80 backdrop-blur-xl border border-brand-cyan/20 rounded-3xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-full flex flex-col group hover:shadow-[0_0_30px_color-mix(in srgb, var(--color-brand-cyan) 15%, transparent)] hover:border-brand-cyan/40 transition-all duration-300 relative overflow-hidden min-h-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors truncate relative z-10">
              {project.title}
            </h3>
            
            <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3 leading-relaxed relative z-10">
              {project.description}
            </p>
            
            <div className="flex justify-between items-center mt-auto relative z-10">
              <div className="flex flex-wrap gap-2 overflow-hidden max-h-[30px] flex-1">
                {project.techStack?.slice(0, 3).map((tech, i) => {
                  const { Icon, color } = getTechIconAndColor(tech);
                  return (
                    <div key={i} className="group/tech flex items-center bg-slate-800/40 border border-slate-700/50 rounded-full p-1 transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-600 cursor-default">
                      <div className="flex items-center justify-center w-4 h-4 shrink-0">
                        {Icon ? (
                          <Icon style={{ color }} className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                        )}
                      </div>
                      <span className="max-w-0 overflow-hidden group-hover/tech:max-w-[100px] group-hover/tech:ml-1 transition-all duration-300 ease-in-out whitespace-nowrap opacity-0 group-hover/tech:opacity-100 text-[10px] font-bold tracking-wider pr-1" style={{ color }}>
                        {tech}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Centered Hover Button */}
            {(project.liveUrl || project.repoUrl) && (
              <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-brand-cyan/20 border border-brand-cyan/50 backdrop-blur-md flex items-center justify-center text-brand-cyan opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-brand-cyan group-hover:text-[#0a0f18] transition-all duration-300 z-20 shadow-[0_0_30px_color-mix(in_srgb,var(--color-brand-cyan)_50%,transparent)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            )}
          </motion.div>
        </Link>
      )
    })
  );

  return (
    <div className="group/carousel w-full overflow-hidden relative py-4 flex items-center -mx-4 px-4 md:-mx-10 md:px-10 xl:-mx-16 xl:px-16">
      <style>{`
        @keyframes smooth-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .run-marquee {
          animation: smooth-marquee 120s linear infinite;
        }
        .run-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Gradients to fade edges */}
      <div className="absolute left-0 top-0 w-8 md:w-16 xl:w-24 h-full bg-gradient-to-r from-[#0a0f18] to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover/carousel:opacity-0" />
      <div className="absolute right-0 top-0 w-8 md:w-16 xl:w-24 h-full bg-gradient-to-l from-[#0a0f18] to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover/carousel:opacity-0" />

      {/* Marquee Container */}
      <div className="flex w-max run-marquee">
        <div className="flex gap-6 pr-6 shrink-0">
          {renderCards(projects)}
        </div>
        <div className="flex gap-6 pr-6 shrink-0">
          {renderCards(projects)}
        </div>
      </div>
    </div>
  );
}
