'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface PhotoData {
  id: string
  url: string
  alt: string
  title: string
  aspectRatio: 'square' | 'portrait' | 'landscape'
}

// Sample Unsplash images styled for a dark/neon aesthetic
const MOCK_PHOTOS: PhotoData[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&q=80', alt: 'Neon sign in Tokyo', title: 'Neo Tokyo Nights', aspectRatio: 'portrait' },
  { id: '2', url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80', alt: 'Cyberpunk setup', title: 'Terminal Hack', aspectRatio: 'landscape' },
  { id: '3', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', alt: 'Circuit board macro', title: 'Hardware Level', aspectRatio: 'square' },
  { id: '4', url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&q=80', alt: 'Abstract neon lines', title: 'Data Stream', aspectRatio: 'portrait' },
  { id: '5', url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80', alt: 'Server room', title: 'Mainframe', aspectRatio: 'landscape' },
  { id: '6', url: 'https://images.unsplash.com/photo-1614729939124-03290b8dfe58?w=600&q=80', alt: 'Hacker typing', title: 'Infiltration', aspectRatio: 'square' },
  { id: '7', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80', alt: 'Cyberpunk city', title: 'Grid City', aspectRatio: 'portrait' },
  { id: '8', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80', alt: 'Matrix code', title: 'Digital Rain', aspectRatio: 'landscape' },
]

export default function PhotoMasonry() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null)

  return (
    <div className="w-full">
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {MOCK_PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl border border-slate-800 hover:border-brand-pink transition-all shadow-lg hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-pink)_30%,transparent)]"
            onClick={() => setSelectedPhoto(photo)}
          >
            {/* Using standard img tag because next/image requires host configuration in next.config.js for external URLs */}
            <img 
              src={photo.url} 
              alt={photo.alt}
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {photo.title}
              </h3>
              <p className="text-brand-pink text-xs font-mono translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                [ VIEW_ASSET ]
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing modal
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-slate-400 hover:text-brand-pink transition-colors p-2 font-mono text-sm tracking-widest"
              >
                [ CLOSE ]
              </button>
              
              <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <img 
                  src={selectedPhoto.url.replace('w=600', 'w=1200')} // Fetch higher res version
                  alt={selectedPhoto.alt}
                  className="w-full h-auto max-h-[85vh] object-contain bg-black"
                />
              </div>
              
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-white font-mono tracking-widest uppercase">
                  {selectedPhoto.title}
                </h2>
                <p className="text-brand-pink text-xs font-mono mt-1">
                  ID: ASSET_{selectedPhoto.id.padStart(4, '0')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
