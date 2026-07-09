'use client'

import React, { useState, useRef } from 'react'

type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'

export default function FileIntegrityChecker() {
  const [file, setFile] = useState<File | null>(null)
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256')
  const [computedHash, setComputedHash] = useState<string>('')
  const [isComputing, setIsComputing] = useState(false)
  
  const [expectedHash, setExpectedHash] = useState<string>('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0])
    }
  }

  const handleFileSelection = async (selectedFile: File) => {
    setFile(selectedFile)
    setComputedHash('')
    setIsComputing(true)

    try {
      // Use FileReader to read the file as an ArrayBuffer
      const arrayBuffer = await selectedFile.arrayBuffer()
      
      // Use SubtleCrypto API to generate the hash natively in the browser
      const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer)
      
      // Convert the ArrayBuffer to a hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      
      setComputedHash(hashHex)
    } catch (error) {
      console.error('Error computing hash:', error)
      setComputedHash('Error: Could not compute hash. File may be too large or corrupted.')
    } finally {
      setIsComputing(false)
    }
  }

  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value as HashAlgorithm)
    // Recompute if a file is already selected
    if (file) {
      handleFileSelection(file)
    }
  }

  const isMatch = expectedHash.trim() !== '' && computedHash !== '' && 
                  expectedHash.trim().toLowerCase() === computedHash.toLowerCase()
  const isMismatch = expectedHash.trim() !== '' && computedHash !== '' && 
                     expectedHash.trim().toLowerCase() !== computedHash.toLowerCase()

  return (
    <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-xl p-6 border-2 border-brand-green/50 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-green)_30%,transparent)] relative overflow-hidden group">
      <div className="absolute inset-0 border-2 border-brand-green opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-xl"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-brand-green flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
          INTEGRITY_CHECK
        </h2>
        <select 
          value={algorithm}
          onChange={handleAlgorithmChange}
          className="bg-slate-900 border border-brand-green text-brand-green text-xs font-mono font-bold rounded p-1 outline-none focus:shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-green)_40%,transparent)] cursor-pointer"
        >
          <option value="SHA-1">SHA-1 (Legacy)</option>
          <option value="SHA-256">SHA-256 (Standard)</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        
        {/* Drop Zone */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
            file ? 'border-brand-green/30 bg-brand-green/5 hover:border-brand-green/50' : 'border-slate-700 hover:border-brand-green/50 hover:bg-slate-800/50'
          }`}
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileInput}
          />
          <svg className={`w-10 h-10 mb-3 ${file ? 'text-brand-green' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm font-mono text-slate-300 text-center">
            {file ? (
              <span className="text-brand-green font-bold">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            ) : (
              <span>Click or drag and drop a file to verify</span>
            )}
          </p>
          <p className="text-xs text-slate-500 mt-2 font-mono">100% Client-Side. Files never leave your device.</p>
        </div>

        {/* Computed Hash Result */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Computed {algorithm} Hash</label>
          <div className="w-full bg-slate-900/80 border border-slate-700 text-brand-green rounded-lg p-3 font-mono text-sm break-all min-h-[50px] flex items-center">
            {isComputing ? (
              <span className="animate-pulse">Computing hash...</span>
            ) : computedHash ? (
              <span className="select-all">{computedHash}</span>
            ) : (
              <span className="text-slate-600">Awaiting file input...</span>
            )}
          </div>
        </div>

        {/* Expected Hash Input for Comparison */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Compare With Expected Hash (Optional)</label>
          <div className="relative">
            <input 
              type="text" 
              value={expectedHash}
              onChange={(e) => setExpectedHash(e.target.value)}
              placeholder="Paste original hash here..."
              className={`w-full bg-slate-900/80 border text-white rounded-lg p-3 pr-10 outline-none transition-all font-mono text-sm ${
                isMatch ? 'border-brand-green shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-green)_40%,transparent)]' : 
                isMismatch ? 'border-red-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-red-500)_40%,transparent)] text-red-400' : 
                'border-slate-700 focus:border-slate-500'
              }`}
            />
            {/* Status Icons */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isMatch && (
                <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {isMismatch && (
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>
          {isMatch && <p className="text-xs text-brand-green font-mono mt-1 text-right">Hashes match! File is intact.</p>}
          {isMismatch && <p className="text-xs text-red-500 font-mono mt-1 text-right">Mismatch detected! File may be corrupted or altered.</p>}
        </div>

      </div>
    </div>
  )
}
