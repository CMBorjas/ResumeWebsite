'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizQuestion } from '../../lib/quiz-data'
import { Terminal, Code, CheckCircle, XCircle, Clock } from 'lucide-react'

type QuizInterfaceProps = {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  onAnswer: (isCorrect: boolean) => void
  timeLeft: number | null
}

export default function QuizInterface({ 
  question, 
  questionNumber, 
  totalQuestions,
  onAnswer,
  timeLeft
}: QuizInterfaceProps) {
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [textInput, setTextInput] = useState('')
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  
  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null)
    setTextInput('')
    setIsEvaluating(false)
    setIsCorrect(null)
  }, [question.id])

  const handleSubmit = () => {
    setIsEvaluating(true)
    
    let correct = false
    if (question.type === 'multiple_choice') {
      correct = selectedOption === question.correctOptionIndex
    } else if (question.type === 'fill_in_blank' && question.correctAnswers) {
      correct = question.correctAnswers.some(
        ans => ans.toLowerCase() === textInput.trim().toLowerCase()
      )
    }
    
    setIsCorrect(correct)
  }

  const handleNext = () => {
    onAnswer(isCorrect ?? false)
  }

  // Handle timeout
  useEffect(() => {
    if (timeLeft === 0 && !isEvaluating) {
      setIsEvaluating(true)
      setIsCorrect(false)
    }
  }, [timeLeft, isEvaluating])

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-black/60 backdrop-blur-md border border-gray-800 p-4 rounded-xl shadow-xl font-mono">
        <div className="flex items-center gap-3 text-[var(--color-primary)]">
          <Terminal className="w-5 h-5" />
          <span className="font-bold tracking-widest uppercase text-sm">
            Challenge {questionNumber} / {totalQuestions}
          </span>
        </div>
        
        <div className="flex gap-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
            question.difficulty === 'Easy' ? 'border-green-500 text-green-500 bg-green-500/10' :
            question.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' :
            'border-red-500 text-red-500 bg-red-500/10'
          }`}>
            {question.difficulty}
          </span>
          
          {timeLeft !== null && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold font-mono transition-colors ${
              timeLeft <= 10 && !isEvaluating ? 'border-red-500 text-red-500 animate-pulse' : 'border-gray-600 text-gray-300'
            }`}>
              <Clock className="w-4 h-4" />
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
          )}
        </div>
      </div>

      {/* Main Question Panel */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden shadow-2xl flex flex-col relative">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 mix-blend-overlay z-0" />
        
        <div className="p-6 md:p-8 z-10">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">{question.title}</h2>
          <p className="text-gray-300 text-lg mb-8">{question.prompt}</p>

          {question.codeSnippet && (
            <div className="mb-8 rounded-lg overflow-hidden border border-gray-700 bg-[#0d1117] relative group">
              <div className="absolute top-0 right-0 p-2 bg-gray-800 rounded-bl-lg opacity-50 flex items-center gap-2">
                <Code className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] uppercase font-mono text-gray-400 font-bold">Snippet</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm text-green-400 font-mono">
                <code>{question.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Interaction Area */}
          <div className="mt-8">
            {!isEvaluating ? (
              <AnimatePresence mode="wait">
                {question.type === 'multiple_choice' && question.options ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {question.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedOption(idx)}
                        className={`p-4 rounded-lg border text-left font-mono transition-all duration-300 ${
                          selectedOption === idx 
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-[0_0_15px_rgba(0,255,225,0.2)]' 
                            : 'border-gray-700 bg-black/50 text-gray-400 hover:border-gray-500 hover:text-white'
                        }`}
                      >
                        <span className="opacity-50 mr-2">[{String.fromCharCode(65 + idx)}]</span>
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full bg-black/60 border border-[var(--color-primary)]/40 p-4 rounded-lg text-[var(--color-primary)] font-mono focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_15px_rgba(0,255,225,0.3)] transition-all"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && textInput.trim()) handleSubmit()
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-xl border ${
                  isCorrect 
                    ? 'bg-green-900/20 border-green-500/50' 
                    : 'bg-red-900/20 border-red-500/50'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500 flex-shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  )}
                  <div>
                    <h3 className={`text-xl font-bold font-mono tracking-widest uppercase ${
                      isCorrect ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {isCorrect ? 'Logic Accepted' : 'Compilation Failed'}
                    </h3>
                    
                    {!isCorrect && question.type === 'multiple_choice' && (
                      <p className="text-gray-300 text-sm mt-2 font-mono">
                        Correct Node: [{String.fromCharCode(65 + (question.correctOptionIndex ?? 0))}] {question.options?.[question.correctOptionIndex ?? 0]}
                      </p>
                    )}
                    
                    {!isCorrect && question.type === 'fill_in_blank' && (
                      <p className="text-gray-300 text-sm mt-2 font-mono">
                        Valid parameters: {question.correctAnswers?.map(a => `"${a}"`).join(' OR ')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-700/50">
                  <p className="text-gray-400 text-sm italic border-l-2 border-gray-500 pl-3">
                    <span className="font-bold text-gray-300 not-italic uppercase text-[10px] tracking-widest block mb-1">SYSTEM_ANALYSIS:</span>
                    {question.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="bg-black/80 border-t border-gray-800 p-4 flex justify-end z-10">
          {!isEvaluating ? (
            <button
              onClick={handleSubmit}
              disabled={(question.type === 'multiple_choice' && selectedOption === null) || (question.type === 'fill_in_blank' && !textInput.trim())}
              className="px-8 py-3 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest font-mono rounded hover:bg-white disabled:opacity-50 disabled:hover:bg-[var(--color-primary)] disabled:cursor-not-allowed transition-colors"
            >
              Execute
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] font-bold uppercase tracking-widest font-mono rounded hover:bg-[var(--color-primary)] hover:text-black transition-colors"
            >
              {questionNumber === totalQuestions ? 'Finalize' : 'Next Node'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
