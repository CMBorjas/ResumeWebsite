import React from 'react'
import FileIntegrityChecker from '../../../components/FileIntegrityChecker'

export default function FileIntegrityPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center justify-center md:justify-start gap-4">
          <span className="text-brand-green">&lt;</span>
          File Integrity Checker
          <span className="text-brand-green">/&gt;</span>
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto md:mx-0">
          A secure, client-side utility for verifying file integrity using cryptographic hash functions. Leveraging the browser's native Web Crypto API, your files never leave your device, ensuring complete privacy and maximum speed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 items-start">
        {/* Main Checker Component */}
        <section>
          <FileIntegrityChecker />
        </section>

        {/* Info / Tech Sidebar */}
        <section className="flex flex-col gap-4">
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Zero-Trust Privacy
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              All hashing is performed locally in your browser's memory using `crypto.subtle`. The file is never uploaded to any server.
            </p>
            
            <h3 className="text-white font-bold mb-2 flex items-center gap-2 mt-6">
              <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Supported Algorithms
            </h3>
            <ul className="text-sm text-slate-400 space-y-1 ml-6 list-disc marker:text-brand-green">
              <li>SHA-256 (Recommended)</li>
              <li>SHA-384</li>
              <li>SHA-512</li>
              <li>SHA-1 (Legacy)</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
