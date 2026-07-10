import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import FlashCardEditor from '../../../../components/flash-cards/FlashCardEditor'

export default function FlashCardEditorPage() {
  return (
    <div className="w-full min-h-screen bg-black pt-24 pb-12 px-4 md:px-8 flex flex-col relative">
      
      {/* Background Styling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 z-10 flex flex-col">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-8">
          <Link 
            href="/projects/flash-cards" 
            className="group flex items-center gap-2 text-slate-400 hover:text-brand-cyan transition-colors font-mono uppercase tracking-widest text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Deck
          </Link>
          <div className="flex gap-2 items-center text-slate-500 font-mono text-xs">
            <span className="animate-pulse w-2 h-2 rounded-full bg-brand-purple"></span>
            NEURAL_FORGE_EDITOR
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3 font-mono tracking-tighter uppercase">
            Neural Forge
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed border-l-2 border-brand-purple pl-4">
            Construct custom data nodes to augment your personal index. Content is processed and maintained locally within your browser's caching layer.
          </p>
        </div>

        {/* Editor Implementation */}
        <FlashCardEditor />

      </div>
    </div>
  )
}
