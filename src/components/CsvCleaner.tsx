'use client'

import React, { useState, useRef } from 'react'
import Papa from 'papaparse'
import { motion, AnimatePresence } from 'framer-motion'

type CleanerSettings = {
  removeEmptyRows: boolean
  trimWhitespace: boolean
  removeDuplicates: boolean
}

export default function CsvCleaner() {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<string[][]>([])
  const [cleanedData, setCleanedData] = useState<string[][]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [settings, setSettings] = useState<CleanerSettings>({
    removeEmptyRows: true,
    trimWhitespace: true,
    removeDuplicates: true
  })
  
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

  const handleFileSelection = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.csv')) {
      alert("Please upload a valid .csv file.")
      return
    }
    setFile(selectedFile)
    setIsProcessing(true)

    Papa.parse(selectedFile, {
      skipEmptyLines: false, // We handle this manually if enabled
      complete: (results) => {
        const parsed = results.data as string[][]
        setData(parsed)
        processData(parsed, settings)
        setIsProcessing(false)
      },
      error: (error) => {
        console.error("Error parsing CSV:", error)
        alert("Failed to parse CSV file.")
        setIsProcessing(false)
      }
    })
  }

  const processData = (rawData: string[][], currentSettings: CleanerSettings) => {
    let processed = [...rawData]

    // Remove empty rows (rows where all cells are empty)
    if (currentSettings.removeEmptyRows) {
      processed = processed.filter(row => row.some(cell => cell && cell.trim() !== ''))
    }

    // Trim whitespace
    if (currentSettings.trimWhitespace) {
      processed = processed.map(row => row.map(cell => cell ? cell.trim() : cell))
    }

    // Remove duplicate rows
    if (currentSettings.removeDuplicates) {
      const seen = new Set<string>()
      processed = processed.filter(row => {
        const rowStr = JSON.stringify(row)
        if (seen.has(rowStr)) return false
        seen.add(rowStr)
        return true
      })
    }

    setCleanedData(processed)
  }

  const handleSettingChange = (key: keyof CleanerSettings) => {
    const newSettings = { ...settings, [key]: !settings[key] }
    setSettings(newSettings)
    if (data.length > 0) {
      processData(data, newSettings)
    }
  }

  const handleDownload = () => {
    if (cleanedData.length === 0) return
    const csv = Papa.unparse(cleanedData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.href = url
    link.setAttribute('download', `cleaned_${file?.name || 'data.csv'}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const reset = () => {
    setFile(null)
    setData([])
    setCleanedData([])
  }

  return (
    <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-xl p-6 border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_30%,transparent)] w-full max-w-4xl mx-auto">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-brand-cyan flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
          DATA_SANITIZER
        </h2>
        {file && (
          <button onClick={reset} className="text-xs font-mono text-slate-400 hover:text-red-400 transition-colors">
            [ RESET_WORKSPACE ]
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Upload & Settings */}
        <div className="flex flex-col gap-6 md:col-span-1">
          
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => !file && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all ${
              file ? 'border-brand-cyan/30 bg-brand-cyan/5' : 'border-slate-700 hover:border-brand-cyan/50 hover:bg-slate-800/50 cursor-pointer'
            }`}
          >
            <input 
              type="file" 
              accept=".csv"
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileInput}
            />
            <svg className={`w-8 h-8 mb-3 ${file ? 'text-brand-cyan' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="text-center">
              {file ? (
                <>
                  <p className="text-brand-cyan font-bold font-mono text-sm break-all">{file.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-mono text-slate-300">Drop CSV file here</p>
                  <p className="text-xs text-slate-500 mt-1">or click to browse</p>
                </>
              )}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4">
            <h3 className="text-xs text-slate-400 font-mono tracking-widest uppercase mb-4 border-b border-slate-700 pb-2">Cleaning Parameters</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="sr-only" checked={settings.removeEmptyRows} onChange={() => handleSettingChange('removeEmptyRows')} />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${settings.removeEmptyRows ? 'bg-brand-cyan border-brand-cyan' : 'bg-transparent border-slate-600 group-hover:border-slate-400'}`}>
                    {settings.removeEmptyRows && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">Drop Empty Rows</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="sr-only" checked={settings.trimWhitespace} onChange={() => handleSettingChange('trimWhitespace')} />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${settings.trimWhitespace ? 'bg-brand-cyan border-brand-cyan' : 'bg-transparent border-slate-600 group-hover:border-slate-400'}`}>
                    {settings.trimWhitespace && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">Trim Whitespace</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="sr-only" checked={settings.removeDuplicates} onChange={() => handleSettingChange('removeDuplicates')} />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${settings.removeDuplicates ? 'bg-brand-cyan border-brand-cyan' : 'bg-transparent border-slate-600 group-hover:border-slate-400'}`}>
                    {settings.removeDuplicates && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">Drop Duplicates</span>
              </label>
            </div>
          </div>
          
          <button 
            onClick={handleDownload}
            disabled={!file || cleanedData.length === 0}
            className="w-full bg-brand-cyan text-black font-bold font-mono py-3 rounded-lg hover:bg-white hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            EXPORT CSV
          </button>
        </div>

        {/* Right Column: Data Preview */}
        <div className="md:col-span-2 flex flex-col bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden min-h-[400px]">
          <div className="bg-slate-800/80 border-b border-slate-700 p-3 flex justify-between items-center">
            <h3 className="text-xs text-slate-300 font-mono tracking-widest uppercase">Data Preview</h3>
            {file && (
              <div className="flex gap-4">
                <div className="text-xs font-mono text-slate-400">
                  Original: <span className="text-red-400">{data.length}</span> rows
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Cleaned: <span className="text-brand-cyan">{cleanedData.length}</span> rows
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-grow p-4 overflow-auto">
            {isProcessing ? (
              <div className="w-full h-full flex items-center justify-center text-brand-cyan font-mono animate-pulse">
                Processing matrix...
              </div>
            ) : cleanedData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs text-slate-300 whitespace-nowrap">
                  <thead className="text-slate-500 border-b border-slate-700">
                    <tr>
                      <th className="px-3 py-2 font-normal">#</th>
                      {cleanedData[0]?.map((_, i) => (
                        <th key={`th-${i}`} className="px-3 py-2 font-normal">Col_{i}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {cleanedData.slice(0, 20).map((row, i) => (
                        <motion.tr 
                          key={`tr-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.02 }}
                          className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                          {row.map((cell, j) => (
                            <td key={`td-${i}-${j}`} className="px-3 py-2 truncate max-w-[150px]" title={cell}>
                              {cell === '' ? <span className="text-slate-600 italic">null</span> : cell}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {cleanedData.length > 20 && (
                  <div className="text-center mt-4 text-xs font-mono text-slate-500">
                    Showing first 20 of {cleanedData.length} rows...
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-mono gap-2">
                <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                Awaiting payload.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
