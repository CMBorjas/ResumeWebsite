import PomodoroTimer from '../../../components/PomodoroTimer'
import Link from 'next/link'

export const metadata = {
  title: 'Pomodoro Timer | Cyberpunk Focus',
  description: 'A cyberpunk-themed pomodoro timer to keep your focus sharp and your workflow optimized.',
}

export default function PomodoroPage() {
  return (
    <div className="min-h-screen py-12 px-4 relative flex flex-col items-center">
      {/* Background decorations */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mb-8">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-cyan transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Terminal
        </Link>
      </div>

      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
          Neuro<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">Focus</span>
        </h1>
        <p className="text-slate-400 font-mono tracking-widest text-sm uppercase max-w-lg mx-auto border-t border-b border-white/5 py-2">
          Cybernetic Time Management Protocol
        </p>
      </div>

      <div className="w-full relative z-10 flex-1 flex flex-col items-center justify-center">
        <PomodoroTimer />
        
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="text-slate-500 font-mono text-xs leading-relaxed">
            <span className="text-brand-pink font-bold">DEEP WORK:</span> 25-minute uninterrupted flow states.
            <br />
            <span className="text-brand-cyan font-bold">SHORT REST:</span> 5-minute neural reset cycles.
            <br />
            <span className="text-yellow-400 font-bold">LONG RECOVERY:</span> 15-minute complete system cooling.
          </p>
        </div>
      </div>
    </div>
  )
}
