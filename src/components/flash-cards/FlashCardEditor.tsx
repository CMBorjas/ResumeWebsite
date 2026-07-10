'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Save, Trash2, Plus, RefreshCw, Keyboard } from 'lucide-react'
import { CardData } from '../FlashCardDeck'

export default function FlashCardEditor() {
  const [deck, setDeck] = useState<CardData[]>([])
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  
  const [frontText, setFrontText] = useState('')
  const [backText, setBackText] = useState('')
  const [isFlipped, setIsFlipped] = useState(false)
  
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true)

  const frontInputRef = useRef<HTMLTextAreaElement>(null)

  // Load from local storage on mount
  useEffect(() => {
    const savedCustom = localStorage.getItem('custom_flashcards')
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom)
        setDeck(parsed)
      } catch (e) {
        console.error('Failed to parse custom flashcards')
      }
    }
  }, [])

  // Save to local storage whenever deck changes
  useEffect(() => {
    localStorage.setItem('custom_flashcards', JSON.stringify(deck))
  }, [deck])

  const handleSaveCard = () => {
    if (!frontText.trim() || !backText.trim()) return

    if (activeCardId) {
      // Edit existing
      setDeck(prev => prev.map(c => 
        c.id === activeCardId ? { ...c, frontContent: frontText, backContent: backText } : c
      ))
    } else {
      // Create new
      const newCard: CardData = {
        id: crypto.randomUUID(),
        frontContent: frontText,
        backContent: backText
      }
      setDeck(prev => [...prev, newCard])
    }

    // Reset editor
    handleNewCard()
  }

  const handleNewCard = () => {
    setActiveCardId(null)
    setFrontText('')
    setBackText('')
    setIsFlipped(false)
    if (frontInputRef.current) {
      frontInputRef.current.focus()
    }
  }

  const handleEditCard = (card: CardData) => {
    setActiveCardId(card.id)
    setFrontText(card.frontContent)
    setBackText(card.backContent)
    setIsFlipped(false)
  }

  const handleDeleteCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setDeck(prev => prev.filter(c => c.id !== id))
    if (activeCardId === id) {
      handleNewCard()
    }
  }

  // Keyboard Shortcuts
  useEffect(() => {
    if (!shortcutsEnabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+Enter or Ctrl+Enter to save
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        handleSaveCard()
      }
      // Alt+F to flip
      if (e.altKey && e.key === 'f') {
        e.preventDefault()
        setIsFlipped(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcutsEnabled, frontText, backText, activeCardId])

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Editor Panel */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        
        {/* Editor Controls */}
        <div className="flex justify-between items-center bg-slate-900/50 border border-slate-700 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white font-mono uppercase tracking-widest">
              {activeCardId ? 'Edit Node' : 'New Node'}
            </h2>
            <button 
              onClick={handleNewCard}
              className="p-2 bg-brand-cyan/20 text-brand-cyan rounded-md hover:bg-brand-cyan hover:text-black transition-colors"
              title="Create New Card"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShortcutsEnabled(!shortcutsEnabled)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors border ${
                shortcutsEnabled 
                  ? 'border-brand-purple text-brand-purple bg-brand-purple/10' 
                  : 'border-slate-600 text-slate-400 bg-slate-800'
              }`}
            >
              <Keyboard className="w-4 h-4" />
              <span className="hidden sm:inline">Shortcuts</span>
              {shortcutsEnabled ? ' (ON)' : ' (OFF)'}
            </button>
          </div>
        </div>

        {/* 3D Flipping Card Editor */}
        <div className="relative w-full h-[450px] [perspective:1000px]">
          <motion.div
            className="w-full h-full relative [transform-style:preserve-3d]"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Front Editor */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-slate-900 border-2 border-brand-purple rounded-xl shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-purple)_30%,transparent)] flex flex-col p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono text-brand-purple tracking-widest uppercase font-bold">
                  [ FRONT - Question ]
                </span>
                <button onClick={() => setIsFlipped(true)} className="text-slate-400 hover:text-brand-purple flex items-center gap-2 text-xs font-mono uppercase">
                  Flip <RefreshCw className="w-3 h-3" />
                </button>
              </div>
              <textarea
                ref={frontInputRef}
                value={frontText}
                onChange={(e) => setFrontText(e.target.value)}
                placeholder="Enter the question or concept here..."
                className="w-full h-full bg-transparent border-none outline-none resize-none text-2xl font-bold text-white placeholder:text-slate-700"
              />
            </div>

            {/* Back Editor */}
            <div 
              className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#0a0f18] border-2 border-brand-cyan rounded-xl shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-cyan)_30%,transparent)] flex flex-col p-6"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono text-brand-cyan tracking-widest uppercase font-bold flex gap-2 items-center">
                  [ BACK - Answer ]
                  <span className="px-2 py-0.5 bg-brand-cyan/20 text-[10px] rounded border border-brand-cyan/30">Markdown Supported</span>
                </span>
                <button onClick={() => setIsFlipped(false)} className="text-slate-400 hover:text-brand-cyan flex items-center gap-2 text-xs font-mono uppercase">
                  Flip <RefreshCw className="w-3 h-3" />
                </button>
              </div>
              <textarea
                value={backText}
                onChange={(e) => setBackText(e.target.value)}
                placeholder="Enter the answer here (Markdown is supported)..."
                className="w-full h-full bg-transparent border-none outline-none resize-none text-lg text-slate-300 font-mono placeholder:text-slate-700"
              />
            </div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <div className="text-xs font-mono text-slate-500">
            {shortcutsEnabled && (
              <span><b className="text-brand-purple">Cmd+Enter</b> to Save | <b className="text-brand-cyan">Alt+F</b> to Flip</span>
            )}
          </div>
          <button
            onClick={handleSaveCard}
            disabled={!frontText.trim() || !backText.trim()}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest font-mono rounded hover:bg-brand-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            <Save className="w-4 h-4" />
            Commit Node
          </button>
        </div>

      </div>

      {/* Database Panel */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col h-full max-h-[600px]">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">
            Local Data Vault ({deck.length})
          </h3>
          
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
            {deck.length === 0 ? (
              <div className="text-slate-600 text-sm font-mono italic text-center mt-10">
                Vault is empty.
              </div>
            ) : (
              deck.map((card) => (
                <div 
                  key={card.id}
                  onClick={() => handleEditCard(card)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    activeCardId === card.id 
                      ? 'border-brand-purple bg-brand-purple/10' 
                      : 'border-slate-800 bg-slate-950 hover:border-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-sm text-white font-bold line-clamp-2 leading-tight">
                      {card.frontContent}
                    </p>
                    <button 
                      onClick={(e) => handleDeleteCard(card.id, e)}
                      className="text-slate-600 hover:text-red-500 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
