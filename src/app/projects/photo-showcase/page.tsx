import React from 'react'
import PhotoMasonry from '../../../components/PhotoMasonry'

export default function PhotoShowcasePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center justify-center md:justify-start gap-4 uppercase tracking-widest">
          <span className="text-brand-pink">{'//'}</span>
          Visual_Assets
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto md:mx-0">
          A dynamic CSS masonry grid showcasing cyberpunk photography. Features a built-in animated Lightbox component powered by framer-motion.
        </p>
      </div>

      <PhotoMasonry />
    </div>
  )
}
