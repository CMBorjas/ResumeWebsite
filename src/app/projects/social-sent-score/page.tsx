'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function SocialSentScorePage() {
  const [sentimentDict, setSentimentDict] = useState<Map<string, number> | null>(null)
  const [inputText, setInputText] = useState('')
  const [results, setResults] = useState<{ totalScore: number; wordScores: { word: string; score: number; total: number }[]; stars: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load the CSV data
    fetch('/data/socialsent.csv')
      .then(res => res.text())
      .then(csvText => {
        const map = new Map<string, number>()
        const lines = csvText.split('\n')
        // Skip header
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(',')
          if (parts.length >= 2) {
            const word = parts[0].trim().toLowerCase()
            const score = parseFloat(parts[1].trim())
            if (!isNaN(score)) {
              map.set(word, score)
            }
          }
        }
        setSentimentDict(map)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to load sentiment dictionary', err)
        setIsLoading(false)
      })
  }, [])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setInputText(event.target.result as string)
        }
      }
      reader.readAsText(file)
    }
  }

  const getStarRating = (score: number) => {
    if (score < -5.0) return 1
    if (score < -1.0) return 2
    if (score < 1.0) return 3
    if (score < 5.0) return 4
    return 5
  }

  const analyzeSentiment = () => {
    if (!sentimentDict) return

    const words = inputText.split(/\s+/)
    let totalScore = 0
    const wordScores: { word: string; score: number; total: number }[] = []

    for (const w of words) {
      const cleaned = w.toLowerCase().replace(/[^a-z]/g, '')
      if (cleaned) {
        const score = sentimentDict.get(cleaned)
        if (score !== undefined) {
          totalScore += score
          wordScores.push({ word: cleaned, score, total: totalScore })
        }
      }
    }

    setResults({
      totalScore,
      wordScores,
      stars: getStarRating(totalScore)
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/70 backdrop-blur-md rounded-xl p-6 md:p-8 border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in_srgb,_var(--color-brand-cyan)_40%,_transparent)]"
      >
        <h1 className="text-3xl font-bold text-brand-cyan mb-2 tracking-wide uppercase">Social Sentiment Score</h1>
        <p className="text-slate-400 mb-6 text-sm">
          A web port of my Rust-based sentiment analyzer. Evaluates the sentiment of a text or file using the Stanford SocialSent dictionary.
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full"></div>
            <span className="ml-4 text-brand-cyan font-mono">Loading Dictionary...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-cyan mb-2 uppercase tracking-wider">
                  Input Text or Upload File
                </label>
                <textarea
                  className="w-full h-48 bg-slate-800/80 text-slate-200 border border-slate-700 rounded-md p-3 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                  placeholder="Paste review text here..."
                  value={inputText}
                  onChange={handleTextChange}
                />
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".txt"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 font-mono text-sm"
                >
                  [ Upload .txt ]
                </button>

                <button
                  onClick={analyzeSentiment}
                  disabled={!inputText.trim()}
                  className="flex-1 px-4 py-2 bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 rounded hover:bg-brand-cyan/40 transition-all font-mono font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                >
                  Analyze Sentiment
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex flex-col h-full min-h-[300px]">
              <h2 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider border-b border-slate-700 pb-2">
                Analysis Results
              </h2>

              {!results ? (
                <div className="flex-1 flex items-center justify-center text-slate-500 font-mono text-sm text-center">
                  Awaiting Input...<br/>Run analysis to see results.
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-6 bg-slate-900/50 p-4 rounded-md border border-slate-700">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Total Score</p>
                      <p className={`text-3xl font-bold ${results.totalScore >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {results.totalScore.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Star Rating</p>
                      <div className="flex gap-1 text-yellow-400 text-2xl">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={star <= results.stars ? 'opacity-100' : 'opacity-20'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto pr-2 custom-scrollbar max-h-[250px]">
                    <table className="w-full text-sm font-mono text-left">
                      <thead className="sticky top-0 bg-slate-800 border-b border-slate-700 text-slate-400 text-xs uppercase">
                        <tr>
                          <th className="py-2 px-2">Word</th>
                          <th className="py-2 px-2 text-right">Score</th>
                          <th className="py-2 px-2 text-right">Accumulated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.wordScores.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="text-center py-4 text-slate-500 italic">No scorable words found</td>
                          </tr>
                        ) : (
                          results.wordScores.map((item, idx) => (
                            <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                              <td className="py-1 px-2 text-slate-300">{item.word}</td>
                              <td className={`py-1 px-2 text-right ${item.score >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {item.score.toFixed(2)}
                              </td>
                              <td className="py-1 px-2 text-right text-brand-cyan">{item.total.toFixed(2)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
