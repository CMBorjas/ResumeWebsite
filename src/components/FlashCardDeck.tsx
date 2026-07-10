'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import FlashCard from './FlashCard'
import { Edit3 } from 'lucide-react'

export interface CardData {
  id: string
  frontContent: string
  backContent: string
}

const DEFAULT_DECK: CardData[] = [
  { id: '1', frontContent: 'What is a closure in JavaScript?', backContent: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function\'s scope from an inner function.' },
  { id: '2', frontContent: 'Explain the Virtual DOM in React.', backContent: 'The Virtual DOM is an in-memory representation of the Real DOM. React uses it to improve performance by comparing the current Virtual DOM with a new one (diffing) and only updating the changed parts in the Real DOM (reconciliation).' },
  { id: '3', frontContent: 'What is the difference between SQL and NoSQL?', backContent: 'SQL databases are relational, table-based, and have predefined schemas. NoSQL databases are non-relational, document/key-value/graph-based, and have dynamic schemas for unstructured data.' },
  { id: '4', frontContent: 'What is the Event Loop?', backContent: 'The event loop is a mechanism in Node.js and browsers that handles asynchronous callbacks. It continuously checks the call stack and the task queue, pushing callbacks from the queue to the stack when the stack is empty.' },
  { id: '5', frontContent: 'Explain CORS.', backContent: 'Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.' },
]

export default function FlashCardDeck() {
  const [activeDeckType, setActiveDeckType] = useState<'default' | 'custom'>('default')
  const [deck, setDeck] = useState<CardData[]>([])
  const [customDeck, setCustomDeck] = useState<CardData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [memorizedIds, setMemorizedIds] = useState<Set<string>>(new Set())

  // Load from local storage
  useEffect(() => {
    const savedMemorized = localStorage.getItem('memorized_flashcards')
    if (savedMemorized) {
      try {
        const parsed = JSON.parse(savedMemorized)
        setMemorizedIds(new Set(parsed))
      } catch (e) {
        console.error('Failed to parse memorized flashcards from localStorage')
      }
    }
    const savedCustom = localStorage.getItem('custom_flashcards')
    if (savedCustom) {
      try {
        setCustomDeck(JSON.parse(savedCustom))
      } catch (e) {
        console.error('Failed to parse custom flashcards')
      }
    }
    
    setDeck(DEFAULT_DECK)
  }, [])
  
  // Handle deck switching
  useEffect(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
    if (activeDeckType === 'default') {
      setDeck(DEFAULT_DECK)
    } else {
      setDeck(customDeck)
    }
  }, [activeDeckType, customDeck])

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('memorized_flashcards', JSON.stringify(Array.from(memorizedIds)))
  }, [memorizedIds])

  const currentCard = deck[currentIndex]

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.length)
    }, 150)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length)
    }, 150)
  }

  const toggleMemorized = () => {
    if (!currentCard) return
    const newSet = new Set(memorizedIds)
    if (newSet.has(currentCard.id)) {
      newSet.delete(currentCard.id)
    } else {
      newSet.add(currentCard.id)
    }
    setMemorizedIds(newSet)
  }

  if (activeDeckType === 'custom' && customDeck.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 text-center items-center justify-center py-20">
        <h2 className="text-xl font-mono text-brand-purple uppercase tracking-widest mb-4">No Custom Nodes Found</h2>
        <p className="text-slate-400 font-mono mb-8">Access the Neural Forge to initialize your custom deck.</p>
        <Link 
          href="/projects/flash-cards/editor"
          className="px-8 py-3 bg-brand-purple text-black font-bold uppercase tracking-widest font-mono rounded-lg hover:bg-white transition-colors"
        >
          Open Neural Forge
        </Link>
        <button 
          onClick={() => setActiveDeckType('default')}
          className="mt-4 text-sm text-slate-500 hover:text-white underline font-mono"
        >
          Return to Default Deck
        </button>
      </div>
    )
  }

  if (deck.length === 0) {
    return <div className="text-brand-cyan animate-pulse font-mono text-center">Loading Neural Deck...</div>
  }

  const isMemorized = memorizedIds.has(currentCard.id)
  const progress = Math.round((memorizedIds.size / deck.length) * 100)

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
      
      {/* Header & Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono uppercase">
              {activeDeckType === 'default' ? 'Tech_Interview_Deck' : 'Custom_Neural_Deck'}
            </h2>
            <Link href="/projects/flash-cards/editor" className="p-2 bg-slate-800 hover:bg-brand-purple text-slate-300 hover:text-black rounded-lg transition-colors flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              <span className="text-xs font-mono font-bold hidden md:inline">Neural Forge</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Deck Toggle */}
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
              <button 
                onClick={() => setActiveDeckType('default')}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-colors ${activeDeckType === 'default' ? 'bg-brand-cyan text-black' : 'text-slate-400 hover:text-white'}`}
              >
                DEFAULT
              </button>
              <button 
                onClick={() => setActiveDeckType('custom')}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-colors ${activeDeckType === 'custom' ? 'bg-brand-purple text-black' : 'text-slate-400 hover:text-white'}`}
              >
                CUSTOM
              </button>
            </div>
            
            <span className="text-xs font-mono text-slate-400">
              {currentIndex + 1} / {deck.length}
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-cyan transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[10px] text-right font-mono text-brand-cyan tracking-widest uppercase">
          {progress}% Memorized
        </div>
      </div>

      {/* Main Card */}
      <FlashCard 
        frontContent={currentCard.frontContent}
        backContent={currentCard.backContent}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />

      {/* Controls */}
      <div className="flex justify-between items-center bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl">
        <button 
          onClick={handlePrev}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={toggleMemorized}
          className={`px-6 py-2 rounded-full font-mono text-sm font-bold transition-all border-2 ${
            isMemorized 
              ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan' 
              : 'bg-transparent border-slate-600 text-slate-400 hover:border-slate-400'
          }`}
        >
          {isMemorized ? 'MEMORIZED' : 'MARK MEMORIZED'}
        </button>

        <button 
          onClick={handleNext}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  )
}
