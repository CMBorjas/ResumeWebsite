export default function ResumePage() {
  return (
    <section className="max-w-5xl mx-auto h-[85vh] flex flex-col pt-4">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-3xl font-bold text-brand-cyan drop-shadow-[0_0_8px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] tracking-wide">
          <span className="text-white mr-2">&gt;</span> RESUME.pdf
        </h2>
        <a 
          href="/ResumeWebsite/resume/Christian_Mandujano_Borjas_Resume.pdf" 
          download="Christian_Mandujano_Borjas_Resume.pdf"
          className="bg-brand-cyan/10 border border-brand-cyan/50 text-brand-cyan px-4 py-2 rounded-lg hover:bg-brand-cyan/20 hover:shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] transition-all flex items-center gap-2 font-semibold tracking-wide text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          DOWNLOAD
        </a>
      </div>
      
      <div className="flex-1 w-full bg-[#0d1117] rounded-xl border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 30%, transparent)] overflow-hidden relative group">
        {/* Glow indicator on hover */}
        <div className="absolute inset-0 border-2 border-brand-cyan opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-xl"></div>
        
        <iframe 
          src="/ResumeWebsite/resume/Christian_Mandujano_Borjas_Resume.pdf" 
          className="w-full h-full rounded-lg bg-slate-800"
          title="Resume PDF Viewer"
        />
      </div>
    </section>
  )
}
