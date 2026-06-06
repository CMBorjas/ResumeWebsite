export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto pt-8">
      <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-8 border-2 border-[#00ffe1]/50 shadow-[0_0_15px_rgba(0,255,225,0.3)] relative overflow-hidden group">
        
        {/* Glow indicator on hover */}
        <div className="absolute inset-0 border-2 border-[#00ffe1] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-xl"></div>

        <h2 className="text-3xl font-bold text-brand-cyan drop-shadow-[0_0_8px_rgba(0,255,225,0.4)] tracking-wide mb-6">
          <span className="text-white mr-2">&gt;</span> SYSTEM.CONTACT
        </h2>
        
        <p className="text-slate-300 mb-8 leading-relaxed">
          I'm currently open to new opportunities, collaborations, and discussions. 
          Whether you have a question or just want to say hi, my inbox is always open!
        </p>

        <div className="space-y-6">
          {/* Email Block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#0d1117] rounded-lg border border-[#00ffe1]/30 hover:border-[#00ffe1]/80 hover:shadow-[0_0_10px_rgba(0,255,225,0.3)] transition-all">
            <div className="bg-brand-cyan/20 p-3 rounded-full text-brand-cyan shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div className="flex-1 min-w-0 w-full">
              <p className="text-xs text-slate-400 tracking-wider uppercase mb-1">Secure Comms Channel</p>
              <a className="block text-sm sm:text-base font-semibold text-brand-cyan hover:text-white transition-colors truncate w-full" href="mailto:C.mandujano.borjas@gmail.com">
                C.mandujano.borjas@gmail.com
              </a>
            </div>
            <a className="mt-2 sm:mt-0 w-full sm:w-auto text-center px-6 py-2 bg-brand-cyan/10 border border-[#00ffe1]/50 text-[#00ffe1] rounded hover:bg-brand-cyan/20 hover:shadow-[0_0_10px_rgba(0,255,225,0.4)] transition-all tracking-wide text-sm font-bold" href="mailto:C.mandujano.borjas@gmail.com">
              TRANSMIT
            </a>
          </div>

          {/* LinkedIn Block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#0d1117] rounded-lg border border-[#00ffe1]/30 hover:border-[#00ffe1]/80 hover:shadow-[0_0_10px_rgba(0,255,225,0.3)] transition-all">
            <div className="bg-brand-cyan/20 p-3 rounded-full text-brand-cyan shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </div>
            <div className="flex-1 min-w-0 w-full">
              <p className="text-xs text-slate-400 tracking-wider uppercase mb-1">Professional Network</p>
              <a className="block text-sm sm:text-base font-semibold text-brand-cyan hover:text-white transition-colors truncate w-full" href="https://www.linkedin.com/in/cchristian-mandujano" target="_blank" rel="noreferrer">
                linkedin.com/in/cchristian-mandujano
              </a>
            </div>
            <a className="mt-2 sm:mt-0 w-full sm:w-auto text-center px-6 py-2 bg-brand-cyan/10 border border-[#00ffe1]/50 text-[#00ffe1] rounded hover:bg-brand-cyan/20 hover:shadow-[0_0_10px_rgba(0,255,225,0.4)] transition-all tracking-wide text-sm font-bold" href="https://www.linkedin.com/in/cchristian-mandujano" target="_blank" rel="noreferrer">
              CONNECT
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
