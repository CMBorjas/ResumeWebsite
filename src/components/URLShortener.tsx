"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShortenedURL {
  original: string;
  short: string;
  id: string;
}

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ShortenedURL[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load history from localstorage
  useEffect(() => {
    const saved = localStorage.getItem("url_shortener_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save history to localstorage
  useEffect(() => {
    localStorage.setItem("url_shortener_history", JSON.stringify(history));
  }, [history]);

  const shortenUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `http://${finalUrl}`;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(finalUrl)}`);
      const data = await res.json();
      
      if (data.shorturl) {
        const newEntry = { 
          id: Date.now().toString(),
          original: finalUrl, 
          short: data.shorturl 
        };
        setHistory(prev => [newEntry, ...prev]);
        setUrl("");
      } else if (data.errormessage) {
        setError(data.errormessage);
      } else {
        setError("Failed to generate short URL. The system might be blocking it.");
      }
    } catch (err) {
      setError("Network error. Please check your connection to the grid.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const removeEntry = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
      {/* Input Box */}
      <div className="bg-[#0a0f18]/80 backdrop-blur-xl border border-brand-cyan/30 rounded-2xl p-8 shadow-[0_0_30px_color-mix(in_srgb,var(--color-brand-cyan)_15%,transparent)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-50"></div>
        
        <form onSubmit={shortenUrl} className="flex flex-col gap-4">
          <label className="text-brand-cyan font-mono text-xs tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse"></span>
            Target URL Sequence
          </label>
          <div className="flex flex-col md:flex-row gap-4 relative">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://very-long-url.com/xyz..."
              className="flex-1 bg-black/60 border border-white/10 focus:border-brand-cyan rounded-lg px-6 py-4 text-white font-mono outline-none transition-colors w-full"
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading || !url.trim()}
              className="bg-brand-cyan/10 border border-brand-cyan/50 text-brand-cyan hover:bg-brand-cyan hover:text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_20%,transparent)]"
            >
              {loading ? "Compressing..." : "Shorten"}
            </button>
          </div>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-red-400 font-mono text-xs mt-2"
            >
              [ERROR]: {error}
            </motion.p>
          )}
        </form>
      </div>

      {/* History */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end border-b border-white/5 pb-2">
          <h3 className="text-white font-bold tracking-wide">Processed Nodes</h3>
          <span className="text-slate-500 font-mono text-xs">{history.length} entries</span>
        </div>

        {history.length === 0 ? (
          <div className="bg-black/30 border border-white/5 rounded-xl p-8 text-center text-slate-500 font-mono text-sm">
            No URLs processed yet. Awaiting input sequence...
          </div>
        ) : (
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-black/50 border border-white/10 hover:border-brand-pink/30 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group transition-colors shadow-lg"
              >
                <div className="flex flex-col overflow-hidden w-full md:w-auto flex-1">
                  <span className="text-slate-400 text-xs font-mono truncate w-full block mb-1">
                    {item.original}
                  </span>
                  <a href={item.short} target="_blank" rel="noopener noreferrer" className="text-brand-pink font-bold text-lg hover:underline inline-flex items-center gap-2">
                    {item.short}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => copyToClipboard(item.short, item.id)}
                    className="flex-1 md:flex-none bg-white/5 hover:bg-brand-cyan/20 border border-white/10 hover:border-brand-cyan/50 text-slate-300 hover:text-brand-cyan px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedId === item.id ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        Copy
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => removeEntry(item.id)}
                    className="p-2 text-slate-500 hover:text-red-400 bg-white/5 hover:bg-red-400/10 border border-white/10 hover:border-red-400/50 rounded-lg transition-colors"
                    title="Delete Entry"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
