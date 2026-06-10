'use client'

import React, { useState, useCallback } from 'react'
import { LuUpload, LuFileText, LuSettings, LuLayers, LuSquareSplitHorizontal, LuDownload, LuEye } from 'react-icons/lu'

// Simple tooltip wrapper component
const Tooltip = ({ children, text }: { children: React.ReactNode, text: string }) => {
  return (
    <div className="group relative inline-flex">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max -translate-x-1/2 scale-95 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
        <div className="rounded bg-slate-800 px-3 py-2 text-xs text-white shadow-xl border border-brand-cyan/30">
          {text}
        </div>
        {/* Triangle pointer */}
        <div className="absolute left-1/2 top-full -mt-[1px] h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-brand-cyan/30 bg-slate-800"></div>
      </div>
    </div>
  )
}

export default function PdfSplitterPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 h-[calc(100vh-100px)] min-h-[800px]">
      <div className="bg-slate-900/70 backdrop-blur-md rounded-xl border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] w-full h-full overflow-hidden flex flex-col">
        {/* Header bar for iframe */}
        <div className="bg-slate-800/80 border-b border-brand-cyan/30 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative items-center justify-center shrink-0">
              <span className="animate-[ping_3s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-xs text-slate-300 font-medium uppercase tracking-wider">Live Demo Environment</span>
          </div>
          <a 
            href="https://cmborjas.github.io/pdf_splitter/" 
            target="_blank" 
            rel="noreferrer"
            className="text-xs text-brand-cyan hover:text-brand-pink transition-colors flex items-center gap-1"
          >
            Open in new tab
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
        
        {/* Embedded Application */}
        <iframe 
          src="https://cmborjas.github.io/pdf_splitter/"
          className="w-full flex-1 border-none bg-[#0d1117]"
          title="PDF Splitter Pro"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
