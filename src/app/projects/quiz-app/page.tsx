'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Terminal, Timer, Play } from 'lucide-react'
import Link from 'next/link'
import { quizQuestions } from '../../../lib/quiz-data'
import QuizInterface from '../../../components/quiz/QuizInterface'
import ScoreScreen from '../../../components/quiz/ScoreScreen'

export default function QuizAppPage() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'ended'>('start')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  
  const SECONDS_PER_QUESTION = 30

  // Timer countdown logic
  useEffect(() => {
    if (gameState === 'playing' && timerEnabled && timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev! - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [gameState, timerEnabled, timeLeft])

  const startSimulation = () => {
    setScore(0)
    setCurrentIndex(0)
    setGameState('playing')
    if (timerEnabled) setTimeLeft(SECONDS_PER_QUESTION)
    else setTimeLeft(null)
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(prev => prev + 1)
    
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(prev => prev + 1)
      if (timerEnabled) setTimeLeft(SECONDS_PER_QUESTION)
    } else {
      setGameState('ended')
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 md:p-8 font-sans selection:bg-[var(--color-primary)] selection:text-black pt-24 md:pt-32">
      
      {/* Background styling */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Navigation */}
        <div className="w-full flex justify-between items-center mb-12">
          <Link href="/projects" className="group flex items-center gap-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors font-mono uppercase tracking-widest text-sm">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Abort Simulation
          </Link>
          <div className="flex gap-2 items-center text-gray-500 font-mono text-xs">
            <span className="animate-pulse w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
            NEURAL_QUIZ_v1.0
          </div>
        </div>

        {/* Dynamic Content area */}
        <div className="w-full">
          {gameState === 'start' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-black/60 backdrop-blur-md border border-gray-800 p-8 md:p-12 rounded-xl shadow-2xl flex flex-col items-center text-center"
            >
              <Terminal className="w-16 h-16 text-[var(--color-primary)] mb-6" />
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wider uppercase font-mono">
                Neural Hacker Quiz
              </h1>
              <p className="text-gray-400 mb-10 text-lg">
                Test your Data Structures and Algorithms knowledge in this interactive terminal simulation. Match patterns, optimize logic, and execute commands.
              </p>
              
              <div className="bg-[#0d1117] border border-gray-800 p-6 rounded-lg w-full mb-10 text-left flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5 text-yellow-500" />
                    <div>
                      <h3 className="text-white font-mono uppercase font-bold tracking-wider text-sm">Pressure Mode</h3>
                      <p className="text-gray-500 text-xs">Enable a {SECONDS_PER_QUESTION}-second countdown timer per node.</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setTimerEnabled(!timerEnabled)}
                    className={`w-14 h-8 rounded-full p-1 transition-colors ${timerEnabled ? 'bg-[var(--color-primary)]' : 'bg-gray-700'}`}
                  >
                    <motion.div 
                      layout
                      className={`w-6 h-6 rounded-full bg-white shadow-md ${timerEnabled ? 'ml-auto' : ''}`}
                    />
                  </button>
                </div>
              </div>
              
              <button
                onClick={startSimulation}
                className="w-full md:w-auto px-12 py-4 bg-[var(--color-primary)] text-black font-bold uppercase tracking-[0.2em] font-mono rounded hover:bg-white transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,255,225,0.4)]"
              >
                <Play className="w-5 h-5" />
                Initialize
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <QuizInterface 
                question={quizQuestions[currentIndex]}
                questionNumber={currentIndex + 1}
                totalQuestions={quizQuestions.length}
                onAnswer={handleAnswer}
                timeLeft={timeLeft}
              />
            </motion.div>
          )}

          {gameState === 'ended' && (
            <motion.div 
              key="ended"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ScoreScreen 
                score={score} 
                totalQuestions={quizQuestions.length} 
                onRestart={() => setGameState('start')}
              />
            </motion.div>
          )}
        </div>
        
      </div>
    </div>
  )
}
