import MarkdownEditor from '../../../components/MarkdownEditor'
import Link from 'next/link'

export const metadata = {
  title: 'Markdown Notes | Cyberpunk Terminal',
  description: 'A real-time, cyberpunk-themed markdown editor with live preview and local storage persistence.',
}

export default function MarkdownNotesPage() {
  return (
    <div className="min-h-screen py-12 px-4 relative flex flex-col items-center">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-full h-full bg-[#0a0f18] -z-10"></div>
      <div className="fixed top-20 left-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mb-8">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-cyan transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Terminal
        </Link>
      </div>

      <div className="text-center mb-8 relative z-10 w-full max-w-[1400px] flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6">
        <div className="text-left">
          <h1 className="text-3xl md:text-5xl font-black mb-2 uppercase tracking-tighter text-white">
            Markdown<span className="text-brand-cyan">.sys</span>
          </h1>
          <p className="text-slate-400 font-mono tracking-widest text-xs uppercase">
            Live-compiling text processor
          </p>
        </div>
        
        <div className="text-left md:text-right mt-4 md:mt-0 font-mono text-xs text-slate-500">
          <span className="text-brand-pink">STATUS:</span> ONLINE
          <br />
          <span className="text-brand-cyan">STORAGE:</span> LOCAL_PERSIST
        </div>
      </div>

      <div className="w-full max-w-[1400px] relative z-10">
        <MarkdownEditor />
      </div>
    </div>
  )
}
