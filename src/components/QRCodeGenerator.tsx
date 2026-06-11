"use client";

import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://cmborjas.github.io/ResumeWebsite");
  const [fgColor, setFgColor] = useState("#22d3ee"); // cyan-400
  const [bgColor, setBgColor] = useState("#0a0f18"); // matches background
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "qr-matrix.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* Settings Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#0a0f18]/80 backdrop-blur-xl border border-brand-cyan/20 rounded-3xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Configuration</h2>
        
        <div className="mb-6">
          <label className="block text-brand-cyan text-sm font-bold mb-2 tracking-wider uppercase">URL or Text Payload</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-black/50 border border-brand-cyan/30 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none shadow-inner"
            rows={4}
            placeholder="Enter URL, Wi-Fi credentials, or encrypted text..."
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-brand-cyan text-sm font-bold mb-2 tracking-wider uppercase">Foreground</label>
            <div className="flex items-center space-x-3 bg-black/30 p-2 rounded-lg border border-white/5">
              <input 
                type="color" 
                value={fgColor} 
                onChange={(e) => setFgColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <span className="text-slate-400 font-mono text-xs uppercase">{fgColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-brand-cyan text-sm font-bold mb-2 tracking-wider uppercase">Background</label>
            <div className="flex items-center space-x-3 bg-black/30 p-2 rounded-lg border border-white/5">
              <input 
                type="color" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <span className="text-slate-400 font-mono text-xs uppercase">{bgColor}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={downloadQR}
          className="w-full py-4 rounded-xl border border-brand-cyan/50 text-brand-cyan font-bold hover:bg-brand-cyan hover:text-black hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_50%,transparent)] transition-all uppercase tracking-wider text-sm flex items-center justify-center group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-y-1 transition-transform">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export PNG
        </button>
      </motion.div>

      {/* Preview Panel */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-center justify-center relative group h-full"
      >
        <div className="absolute inset-0 bg-brand-cyan/5 rounded-[40px] blur-3xl group-hover:bg-brand-cyan/10 transition-colors duration-500 -z-10"></div>
        <div 
          className="p-8 rounded-[32px] border-2 border-brand-cyan/30 shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-cyan)_20%,transparent)] group-hover:shadow-[0_0_60px_color-mix(in_srgb,var(--color-brand-cyan)_30%,transparent)] transition-all duration-500 flex items-center justify-center min-h-[320px] min-w-[320px]"
          style={{ backgroundColor: bgColor }}
          ref={qrRef}
        >
          <QRCode 
            value={text || " "} 
            size={256} 
            fgColor={fgColor} 
            bgColor={bgColor} 
            level="H" 
            className="rounded-xl transition-all duration-300"
          />
        </div>
        <p className="mt-8 text-slate-500 font-mono text-sm tracking-widest uppercase flex items-center">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse mr-2"></span>
          Live Projection
        </p>
      </motion.div>

    </div>
  );
}
