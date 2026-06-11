"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GithubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

interface ParsedLog {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: string[];
  type: string;
  url: string;
}

export default function ChangelogComponent() {
  const [logs, setLogs] = useState<ParsedLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch("https://api.github.com/repos/CMBorjas/ResumeWebsite/commits?per_page=15");
        const data: GithubCommit[] = await res.json();
        
        const parsedLogs = data.map((item) => {
          const fullMessage = item.commit.message;
          const lines = fullMessage.split('\n').filter(line => line.trim() !== '');
          const firstLine = lines[0];
          
          let title = firstLine;
          let description = "Direct commit to the repository.";
          let type = "update";
          
          if (firstLine.includes(':')) {
            const parts = firstLine.split(':');
            type = parts[0].trim().toLowerCase();
            title = parts.slice(1).join(':').trim();
            title = title.charAt(0).toUpperCase() + title.slice(1);
          }
          
          const changes = lines.length > 1 ? lines.slice(1) : [title];
          
          const date = new Date(item.commit.author.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });

          return {
            version: item.sha.substring(0, 7),
            date,
            title,
            description,
            changes,
            type,
            url: item.html_url
          };
        });
        
        setLogs(parsedLogs);
      } catch (error) {
        console.error("Failed to fetch changelog:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCommits();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 px-6 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-brand-cyan/30 border-t-brand-cyan rounded-full animate-spin"></div>
          <p className="text-brand-cyan mt-6 font-mono text-xs tracking-widest uppercase animate-pulse">Accessing Mainframe Git Logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <div className="relative border-l-2 border-brand-cyan/20 ml-4 md:ml-0">
        {logs.map((log, index) => (
          <motion.div 
            key={log.version}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-12 relative pl-8 md:pl-12 group"
          >
            {/* Timeline node */}
            <div className="absolute w-4 h-4 rounded-full bg-[#0a0f18] border-[3px] border-brand-cyan left-[-9px] top-1.5 group-hover:bg-brand-cyan group-hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)] transition-all duration-300"></div>
            
            <div className="flex flex-col md:flex-row md:items-baseline mb-3">
              <h3 className="text-xl font-bold text-white tracking-wide">
                <a href={log.url} target="_blank" rel="noopener noreferrer" className="text-brand-pink drop-shadow-[0_0_5px_color-mix(in_srgb,var(--color-brand-pink)_80%,transparent)] mr-2 hover:underline">
                  {log.version}
                </a>
                <span className="text-slate-500 mx-2 hidden md:inline">|</span>
                {log.title}
              </h3>
              <span className="text-xs font-mono text-brand-cyan/60 mt-1 md:mt-0 md:ml-auto block tracking-widest">{log.date}</span>
            </div>
            
            <div className="bg-[#0a0f18]/80 backdrop-blur-md border border-brand-cyan/10 rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:border-brand-cyan/30 group-hover:shadow-[0_4px_30px_color-mix(in_srgb,var(--color-brand-cyan)_10%,transparent)] transition-all duration-300">
              <p className="text-slate-400 text-sm mb-5 leading-relaxed border-b border-white/5 pb-4">
                <span className={`inline-block px-2 py-1 text-[10px] uppercase tracking-wider rounded font-bold mr-3 ${
                  log.type === 'feature' || log.type === 'feat' ? 'bg-green-400/10 text-green-400 border border-green-400/20' :
                  log.type === 'fix' ? 'bg-red-400/10 text-red-400 border border-red-400/20' :
                  log.type === 'docs' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' :
                  'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                }`}>
                  {log.type}
                </span>
                {log.description}
              </p>
              
              <ul className="space-y-3">
                {log.changes.map((change, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-300">
                    <span className="text-brand-cyan mr-3 font-bold opacity-80 mt-0.5">›</span> 
                    <span className="leading-snug">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
