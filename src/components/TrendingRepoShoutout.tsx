"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrendingRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  owner: {
    avatar_url: string;
    login: string;
  }
}

export default function TrendingRepoShoutout() {
  const [repos, setRepos] = useState<TrendingRepo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingRepos() {
      try {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        const dateString = date.toISOString().split('T')[0];
        
        const res = await fetch(`https://api.github.com/search/repositories?q=created:>${dateString}&sort=stars&order=desc&per_page=10`);
        if (!res.ok) throw new Error("Failed to fetch trending repos");
        const data = await res.json();
        
        if (data.items && data.items.length > 0) {
          setRepos(data.items);
        }
      } catch (error) {
        console.error("Error fetching trending repos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingRepos();
  }, []);

  useEffect(() => {
    if (repos.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % repos.length);
    }, 6000); // cycle every 6 seconds
    
    return () => clearInterval(interval);
  }, [repos.length]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-yellow-400/50 p-6">
        <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs font-mono tracking-widest uppercase">Fetching Trending...</p>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 font-mono text-sm p-6">
        No trending repositories found.
      </div>
    );
  }

  const repo = repos[currentIndex];

  return (
    <div className="p-6 flex flex-col h-full bg-gradient-to-br hover:from-yellow-400/5 hover:to-transparent transition-colors duration-500 relative group overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all duration-500 pointer-events-none"></div>

      <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-extrabold uppercase tracking-widest py-1 px-3 rounded-bl-xl shadow-lg z-20 flex items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-2"></span>
        Trending #{currentIndex + 1}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={repo.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col h-full relative z-10"
        >
          <div className="flex items-center mb-4 mt-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 border border-yellow-400/40 overflow-hidden bg-black/50 shadow-[0_0_10px_color-mix(in_srgb,var(--color-yellow-400)_40%,transparent)] shrink-0">
              <img src={repo.owner.avatar_url} alt={repo.owner.login} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col truncate pr-20">
              <h3 className="text-lg font-bold text-white truncate drop-shadow-[0_0_5px_color-mix(in_srgb,var(--color-yellow-400)_50%,transparent)]" title={repo.full_name}>
                {repo.name}
              </h3>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest truncate">{repo.owner.login}</span>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
            {repo.description || "No description provided. Explore the code to discover its secrets."}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-yellow-400/20">
            <div className="flex space-x-3 items-center">
              {repo.language && (
                <span className="flex items-center text-[10px] font-mono text-yellow-400/90 font-bold uppercase tracking-wider bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                  {repo.language}
                </span>
              )}
              <span className="flex items-center text-xs font-mono text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-400">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                {repo.stargazers_count.toLocaleString()}
              </span>
            </div>
            
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-widest hover:text-white transition-colors flex items-center group-hover:underline"
            >
              View Repo
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
