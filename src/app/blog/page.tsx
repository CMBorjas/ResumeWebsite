'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Terminal, Calendar, ChevronRight } from 'lucide-react'
import { BLOG_POSTS } from '../../lib/blog'

export default function BlogFeedPage() {
  const sortedPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 min-h-[80vh]">
      
      <div className="mb-12 border-b border-slate-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center gap-4 uppercase tracking-widest">
          <Terminal className="w-10 h-10 text-brand-purple" />
          Neural_Logs
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          Architectural deep dives, telemetry reports, and engineering philosophies from the edge of the network.
        </p>
      </div>

      <motion.div 
        className="flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {sortedPosts.map((post) => (
          <motion.div key={post.slug} variants={itemVariants}>
            <Link href={`/blog/${post.slug}`}>
              <div className="group bg-[#0a0f18]/80 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-brand-purple/50 p-6 md:p-8 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden">
                
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex-1 flex flex-col gap-3 relative z-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-slate-600">|</span>
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-brand-cyan/80 bg-brand-cyan/10 px-2 py-0.5 rounded-full border border-brand-cyan/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white group-hover:text-brand-purple transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="hidden md:flex items-center justify-center p-4 bg-slate-900/50 rounded-full border border-slate-800 group-hover:border-brand-purple/50 group-hover:bg-brand-purple/10 transition-colors z-10">
                  <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-brand-purple transition-colors" />
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}
