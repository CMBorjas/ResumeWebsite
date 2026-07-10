'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Movie } from '../../lib/movies'
import { Search, Filter, Star, Clock, User, Clapperboard } from 'lucide-react'

type MovieFeedProps = {
  movies: Movie[]
  selectedMovie: Movie | null
  onSelectMovie: (movie: Movie) => void
}

export default function MovieFeed({ movies, selectedMovie, onSelectMovie }: MovieFeedProps) {
  const [filterGenre, setFilterGenre] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const allGenres = ['All', ...Array.from(new Set(movies.flatMap(m => m.genre)))]

  const filteredMovies = movies.filter(movie => {
    const matchesGenre = filterGenre === 'All' || movie.genre.includes(filterGenre)
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          movie.director.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesGenre && matchesSearch
  })

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      {/* Control Panel */}
      <div className="bg-black/60 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xl">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-primary)]" />
          <input
            type="text"
            placeholder="Query database (Title, Director)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/50 border border-[var(--color-primary)]/30 rounded-md py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors font-mono"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {allGenres.map(genre => (
            <button
              key={genre}
              onClick={() => setFilterGenre(genre)}
              className={`px-3 py-1 text-xs font-mono whitespace-nowrap rounded-full transition-all duration-300 ${
                filterGenre === genre 
                  ? 'bg-[var(--color-secondary)] text-black font-bold drop-shadow-[0_0_8px_var(--color-secondary)]' 
                  : 'bg-transparent border border-gray-700 text-gray-400 hover:border-gray-400'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMovies.map((movie) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              className={`cursor-pointer group relative bg-black/40 backdrop-blur-sm p-5 rounded-lg border-2 flex flex-col justify-between min-h-[300px] transition-all duration-300 ${
                selectedMovie?.id === movie.id 
                  ? 'border-[var(--color-primary)] shadow-[0_0_15px_rgba(0,255,225,0.4)] scale-[1.02]' 
                  : 'border-gray-800 hover:border-gray-600'
              }`}
              style={{
                // Apply a glowing neon border aesthetic based on the movie's defined color when hovered or selected
                borderColor: selectedMovie?.id === movie.id ? movie.neonColor : undefined,
                boxShadow: selectedMovie?.id === movie.id ? `0 0 20px ${movie.neonColor}40` : undefined,
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"
                style={{ background: `radial-gradient(circle at center, ${movie.neonColor}, transparent)` }}
              />
              
              <div className="z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider font-mono">{movie.title}</h3>
                  <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded border border-gray-700 text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold">{movie.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map(g => (
                    <span key={g} className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                      {g}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Clapperboard className="w-4 h-4 text-gray-500" />
                    {movie.director}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-2 line-clamp-1">
                    <User className="w-4 h-4 text-gray-600" />
                    {movie.cast.join(', ')}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    {movie.duration} ({movie.year})
                  </p>
                </div>

                <div className="mt-auto">
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2 italic border-l-2 pl-2 border-[var(--color-primary)]">
                    "{movie.synopsis}"
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                    <span className="text-lg font-bold text-white font-mono">${movie.price.toFixed(2)}</span>
                    <button 
                      className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded transition-all duration-300 ${
                        selectedMovie?.id === movie.id 
                          ? 'bg-white text-black' 
                          : 'bg-transparent border border-gray-600 text-gray-300 group-hover:border-white group-hover:text-white'
                      }`}
                    >
                      {selectedMovie?.id === movie.id ? 'SELECTED' : 'SELECT'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredMovies.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 font-mono">
            No matching targets found in database.
          </div>
        )}
      </div>
    </div>
  )
}
