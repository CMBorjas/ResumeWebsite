"use client";

import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
}

export default function RandomRepoShoutout() {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRandomRepo() {
      try {
        const res = await fetch("https://api.github.com/users/CMBorjas/repos?per_page=100&sort=updated");
        if (!res.ok) throw new Error("Failed to fetch repos");
        const repos: Repo[] = await res.json();
        
        // Filter out forks and the profile readme repo
        const validRepos = repos.filter(r => !r.fork && r.name !== "CMBorjas");
        
        if (validRepos.length > 0) {
          const randomIndex = Math.floor(Math.random() * validRepos.length);
          setRepo(validRepos[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching random repo:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRandomRepo();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-brand-pink/50 p-6">
        <div className="w-6 h-6 border-2 border-brand-pink border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs font-mono tracking-widest uppercase">Fetching Repo...</p>
      </div>
    );
  }

  if (!repo) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 font-mono text-sm p-6">
        No public repositories found.
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col h-full bg-gradient-to-br hover:from-brand-pink/5 hover:to-transparent transition-colors duration-500 relative group overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-pink/10 rounded-full blur-2xl group-hover:bg-brand-pink/20 transition-all duration-500 pointer-events-none"></div>

      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 border border-brand-pink/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-pink">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white truncate drop-shadow-[0_0_5px_color-mix(in_srgb,var(--color-brand-pink)_50%,transparent)]" title={repo.name}>
          {repo.name}
        </h3>
      </div>
      
      <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3 relative z-10">
        {repo.description || "No description provided. Explore the code to discover its secrets."}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-pink/20 relative z-10">
        <div className="flex space-x-3">
          {repo.language && (
            <span className="flex items-center text-[10px] font-mono text-brand-pink/80 font-bold uppercase tracking-wider bg-brand-pink/10 px-2 py-0.5 rounded border border-brand-pink/20">
              {repo.language}
            </span>
          )}
          <span className="flex items-center text-xs font-mono text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-400">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            {repo.stargazers_count}
          </span>
        </div>
        
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-extrabold text-brand-pink uppercase tracking-widest hover:text-white transition-colors flex items-center group-hover:underline"
        >
          Inspect
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
