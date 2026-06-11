'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function SocialSentScorePage() {
  const [sentimentDict, setSentimentDict] = useState<Map<string, number> | null>(null)
  const [inputText, setInputText] = useState('')
  const [results, setResults] = useState<{ totalScore: number; wordScores: { word: string; score: number; total: number }[]; stars: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [repoStats, setRepoStats] = useState<{ stars: number; forks: number } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const basePath = process.env.NODE_ENV === 'production' ? '/ResumeWebsite' : '';
    // Load the CSV data
    fetch(`${basePath}/data/socialsent.csv`)
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

    // Fetch GitHub stats
    fetch('https://api.github.com/repos/CMBorjas/CSCI_3415-Homework004')
      .then(res => res.json())
      .then(data => {
        if (data && data.stargazers_count !== undefined) {
          setRepoStats({
            stars: data.stargazers_count,
            forks: data.forks_count
          })
        }
      })
      .catch(console.error)
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

  const clearAll = () => {
    setInputText('')
    setResults(null)
  }

  const loadPositive = () => {
    setInputText("I am absolutely thrilled and excited about this wonderful product! It makes me so incredibly happy and joyous to see such brilliant innovation.")
    setResults(null)
  }

  const loadNegative = () => {
    setInputText("This is a terrible and awful mistake. I am extremely disappointed and angry about this horrible failure.")
    setResults(null)
  }

  const renderHighlightedText = () => {
    if (!results) return null;
    const words = inputText.split(/(\s+)/); // keep whitespace
    return words.map((word, idx) => {
      if (!word.trim()) return <span key={idx}>{word}</span>;
      
      const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
      const scoreObj = results.wordScores.find(w => w.word === cleaned);
      
      if (scoreObj) {
        if (scoreObj.score > 0) {
          return <span key={idx} className="text-green-400 font-bold bg-green-400/10 px-0.5 rounded" title={`Score: ${scoreObj.score}`}>{word}</span>;
        } else if (scoreObj.score < 0) {
          return <span key={idx} className="text-red-400 font-bold bg-red-400/10 px-0.5 rounded" title={`Score: ${scoreObj.score}`}>{word}</span>;
        }
      }
      return <span key={idx} className="text-slate-400">{word}</span>;
    });
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
              <div className="flex items-center gap-2 mb-2">
                <button onClick={loadPositive} className="text-xs px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/30 rounded hover:bg-green-500/20 transition-colors">
                  Load Positive
                </button>
                <button onClick={loadNegative} className="text-xs px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors">
                  Load Negative
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-cyan mb-2 uppercase tracking-wider">
                  Input Text or Upload File
                </label>
                <textarea
                  className="w-full h-40 bg-slate-800/80 text-slate-200 border border-slate-700 rounded-md p-3 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                  placeholder="Paste review text here..."
                  value={inputText}
                  onChange={handleTextChange}
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="file"
                  accept=".txt"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 font-mono text-xs whitespace-nowrap"
                >
                  [ Upload .txt ]
                </button>

                <button
                  onClick={clearAll}
                  disabled={!inputText}
                  className="px-3 py-2 bg-slate-800/50 text-slate-400 rounded hover:bg-slate-700 hover:text-red-400 transition-colors border border-slate-700 font-mono text-xs disabled:opacity-50"
                >
                  Clear
                </button>

                <button
                  onClick={analyzeSentiment}
                  disabled={!inputText.trim()}
                  className="flex-1 min-w-[140px] px-4 py-2 bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 rounded hover:bg-brand-cyan/40 transition-all font-mono font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm"
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

                  <div className="flex-1 overflow-auto pr-2 custom-scrollbar max-h-[150px] mb-4">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Sentiment Map</p>
                    <div className="bg-slate-900/80 p-3 rounded border border-slate-700/50 text-sm leading-relaxed">
                      {renderHighlightedText()}
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto pr-2 custom-scrollbar max-h-[150px]">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Scored Words</p>
                    <table className="w-full text-sm font-mono text-left">
                      <thead className="sticky top-0 bg-slate-800 border-b border-slate-700 text-slate-400 text-xs uppercase z-10">
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

      {/* GitHub Repo Bento Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 w-full"
      >
        <a 
          href="https://github.com/CMBorjas/CSCI_3415-Homework004"
          target="_blank"
          rel="noreferrer"
          className="bg-slate-900/70 backdrop-blur-md rounded-xl p-5 border-2 border-brand-cyan/50 hover:border-brand-cyan hover:shadow-[0_0_15px_color-mix(in_srgb,_var(--color-brand-cyan)_60%,_transparent)] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between group gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-cyan/10 rounded-lg group-hover:bg-brand-cyan/20 transition-colors">
              <svg className="w-8 h-8 text-brand-cyan group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors text-lg">CSCI_3415-Homework004</h3>
              <p className="text-sm text-slate-400">View source code and Rust implementation on GitHub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-mono w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-700/50 pt-4 sm:pt-0">
            {repoStats ? (
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                  <span className="text-base font-bold">{repoStats.stars}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>
                  <span className="text-base font-bold">{repoStats.forks}</span>
                </div>
              </div>
            ) : (
              <span className="text-slate-500 animate-pulse">Loading stats...</span>
            )}
            <div className="text-brand-cyan group-hover:translate-x-2 transition-transform bg-brand-cyan/10 p-2 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  )
}
