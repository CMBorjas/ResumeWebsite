'use client'

import React, { useState, useCallback } from 'react'
import { LuUpload, LuFileText, LuSettings, LuLayers, LuSquareSplitHorizontal, LuDownload, LuEye } from 'react-icons/lu'
import dynamic from 'next/dynamic'

const PdfViewer = dynamic(() => import('../../../components/pdf-splitter/PdfViewer').then(mod => mod.PdfViewer), { ssr: false })

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
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type === 'application/pdf') {
        setPdfFile(file)
      } else {
        alert('Please drop a valid PDF file.')
      }
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        setPdfFile(file)
      } else {
        alert('Please select a valid PDF file.')
      }
    }
  }, [])

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-12">
      <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-8 border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="bg-gradient-to-br from-brand-cyan to-brand-pink p-3 rounded-xl shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]">
              <LuLayers size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">
                PDF Splitter Pro
              </h1>
              <p className="text-slate-400 text-sm">Secure Client-Side Document Editor</p>
            </div>
          </div>

          {pdfFile && (
            <button 
              onClick={() => setPdfFile(null)}
              className="text-sm border border-slate-600 hover:border-brand-cyan text-slate-300 hover:text-brand-cyan px-4 py-2 rounded transition-colors"
            >
              Start Over
            </button>
          )}
        </div>

        {/* Workspace */}
        {!pdfFile ? (
          <div className="flex flex-col items-center">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileUpload')?.click()}
              className={`w-full max-w-[700px] min-h-[300px] flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                isDragActive 
                  ? 'border-brand-cyan bg-brand-cyan/5 shadow-[0_0_20px_color-mix(in srgb, var(--color-brand-cyan) 20%, transparent)] scale-[1.02]' 
                  : 'border-slate-600 hover:border-brand-cyan/50 hover:bg-slate-800/50'
              }`}
            >
              <div className={`p-4 rounded-full mb-4 transition-all ${isDragActive ? 'bg-brand-cyan/20 shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]' : 'bg-slate-800'}`}>
                <LuUpload size={48} className={isDragActive ? 'text-brand-cyan' : 'text-slate-400'} />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">Drag & Drop your PDF here</h3>
              <p className="text-slate-500 mb-6">Or click to browse from your device</p>

              <div className="flex items-center gap-2 text-brand-pink text-xs font-bold bg-brand-pink/10 px-4 py-2 rounded-full">
                <LuFileText size={16} />
                <span>100% Client-Side Processing • Your files never leave your browser</span>
              </div>
            </div>
            
            <input
              type="file"
              id="fileUpload"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-300">
            {/* File Info Bar */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <LuSettings size={24} className="text-brand-cyan" />
                <div>
                  <p className="font-bold text-slate-200">{pdfFile.name}</p>
                  <p className="text-xs text-slate-500">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              
              <Tooltip text="Dynamic Summaries (Pending): Will calculate output stats based on your selection.">
                <div className="bg-slate-900 px-4 py-2 rounded border border-slate-700 text-sm text-slate-400 flex items-center gap-2 cursor-help">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                  Processing metrics pending...
                </div>
              </Tooltip>
            </div>

            {/* Editor Layout Native Port */}
            <div className="bg-[#0d1117] rounded-lg border border-slate-800 p-6 relative overflow-hidden">
              <PdfViewer file={pdfFile} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
