import URLShortener from '../../../components/URLShortener'
import Link from 'next/link'

export const metadata = {
  title: 'URL Shortener | Link Compressor',
  description: 'Compress long URLs into shareable, cyberpunk-themed micro-links using a fast, free API.',
}

export default function URLShortenerPage() {
  return (
    <div className="min-h-screen py-12 px-4 relative flex flex-col items-center">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-full h-full bg-[#0a0f18] -z-10"></div>
      <div className="fixed top-20 right-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mb-8">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-cyan transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Terminal
        </Link>
      </div>

      <div className="text-center mb-12 relative z-10 w-full max-w-[1200px]">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Link<span className="text-brand-cyan">Compressor</span>
        </h1>
        <p className="text-slate-400 font-mono tracking-widest text-sm uppercase max-w-lg mx-auto border-t border-b border-white/5 py-2">
          URL Minimization Protocol
        </p>
      </div>

      <div className="w-full relative z-10 flex-1 flex flex-col items-center justify-start">
        <URLShortener />
        
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="text-slate-500 font-mono text-xs leading-relaxed px-4">
            <span className="text-brand-cyan font-bold">PROTOCOL:</span> Enter any valid uniform resource locator to compress its character footprint. The compressed link will route traffic directly to the original target destination via HTTP redirect.
          </p>
        </div>
      </div>
    </div>
  )
}
