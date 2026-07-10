'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Clapperboard } from 'lucide-react'
import { movies, Movie } from '../../../lib/movies'

import MovieFeed from '../../../components/cinema/MovieFeed'
import SeatSelector, { Seat } from '../../../components/cinema/SeatSelector'
import CheckoutTerminal from '../../../components/cinema/CheckoutTerminal'

export default function CinemaNexusPage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [reservedSeatsCache, setReservedSeatsCache] = useState<string[]>([])

  // Load reserved seats from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cinema_nexus_reservations')
    if (stored) {
      try {
        setReservedSeatsCache(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse reservations', e)
      }
    }
  }, [])

  const handleMovieSelect = (movie: Movie) => {
    if (selectedMovie?.id === movie.id) {
      // Unselect if already selected
      setSelectedMovie(null)
      setSelectedShowtime(null)
      setSelectedSeats([])
      setIsConfirmed(false)
      return
    }
    setSelectedMovie(movie)
    setSelectedShowtime(null)
    setSelectedSeats([])
    setIsConfirmed(false)
  }

  const handleShowtimeSelect = (time: string) => {
    setSelectedShowtime(time)
    setSelectedSeats([])
    setIsConfirmed(false)
  }

  const handleToggleSeat = (seat: Seat) => {
    if (isConfirmed) return // Prevent toggling after purchase

    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === seat.id)
      if (exists) {
        return prev.filter(s => s.id !== seat.id)
      } else {
        return [...prev, seat]
      }
    })
  }

  const handleConfirmReservation = () => {
    if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) return

    // Save to local storage
    const newReservationKeys = selectedSeats.map(s => `${selectedMovie.id}-${selectedShowtime}-${s.id}`)
    const updatedCache = [...reservedSeatsCache, ...newReservationKeys]
    
    localStorage.setItem('cinema_nexus_reservations', JSON.stringify(updatedCache))
    setReservedSeatsCache(updatedCache)
    setIsConfirmed(true)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div>
        <Link 
          href="/projects" 
          className="text-[var(--color-primary)] hover:text-white transition-colors text-sm font-mono flex items-center gap-2 w-fit mb-4"
        >
          &lt; RETURN_TO_PROJECTS
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest flex items-center gap-4 font-mono">
          <Clapperboard className="w-10 h-10 text-[var(--color-primary)] drop-shadow-[0_0_10px_var(--color-primary)]" />
          Cinema_Nexus
        </h1>
        <p className="text-gray-400 mt-2 font-mono max-w-2xl">
          Target acquisition & reservation system. Browse newly decrypted movie targets, select chronos, and secure your nodes locally.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Movie Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white font-mono uppercase tracking-widest border-b border-gray-800 pb-2">
            1. Target Database
          </h2>
          <MovieFeed 
            movies={movies} 
            selectedMovie={selectedMovie} 
            onSelectMovie={handleMovieSelect} 
          />
        </div>

        {/* Right Column: Checkout & Seating */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <h2 className="text-xl font-bold text-white font-mono uppercase tracking-widest border-b border-gray-800 pb-2 opacity-50">
            2. Reservation & Authorization
          </h2>
          
          <AnimatePresence mode="popLayout">
            {selectedMovie ? (
              <motion.div
                key="booking-panels"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <SeatSelector 
                  movie={selectedMovie}
                  selectedShowtime={selectedShowtime}
                  onSelectShowtime={handleShowtimeSelect}
                  selectedSeats={selectedSeats}
                  onToggleSeat={handleToggleSeat}
                  reservedSeatsCache={reservedSeatsCache}
                />

                {selectedShowtime && (
                  <CheckoutTerminal 
                    movie={selectedMovie}
                    selectedShowtime={selectedShowtime}
                    selectedSeats={selectedSeats}
                    onConfirm={handleConfirmReservation}
                    isConfirmed={isConfirmed}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-64 border border-gray-800 border-dashed rounded-xl flex items-center justify-center text-gray-600 font-mono italic text-center p-6"
              >
                Awaiting target selection from the database...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
