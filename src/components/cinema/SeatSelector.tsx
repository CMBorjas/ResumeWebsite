'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Movie } from '../../lib/movies'

export type Seat = {
  id: string
  row: string
  num: number
  status: 'available' | 'reserved' | 'selected'
}

type SeatSelectorProps = {
  movie: Movie
  selectedShowtime: string | null
  onSelectShowtime: (time: string) => void
  selectedSeats: Seat[]
  onToggleSeat: (seat: Seat) => void
  reservedSeatsCache: string[] // IDs of reserved seats passed from parent
}

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F']
const SEATS_PER_ROW = 8

export default function SeatSelector({ 
  movie, 
  selectedShowtime, 
  onSelectShowtime, 
  selectedSeats, 
  onToggleSeat,
  reservedSeatsCache 
}: SeatSelectorProps) {
  
  const [seats, setSeats] = useState<Seat[]>([])

  // Generate seats
  useEffect(() => {
    if (!selectedShowtime) {
      setSeats([])
      return
    }

    // A deterministic pseudo-random way to mark some seats as reserved based on movie + showtime
    // to simulate a live cinema.
    const seedString = `${movie.id}-${selectedShowtime}`
    let hash = 0
    for (let i = 0; i < seedString.length; i++) {
      hash = Math.imul(31, hash) + seedString.charCodeAt(i) | 0
    }
    
    const newSeats: Seat[] = []
    ROWS.forEach(row => {
      for (let i = 1; i <= SEATS_PER_ROW; i++) {
        const id = `${row}${i}`
        
        // Pseudo-random initial reservation logic + local storage cache
        const isLocallyReserved = reservedSeatsCache.includes(`${movie.id}-${selectedShowtime}-${id}`)
        
        // Use hash to make deterministic "taken" seats for the demo
        const isPreTaken = ((hash * i + row.charCodeAt(0)) % 100) < 30 // ~30% taken

        newSeats.push({
          id,
          row,
          num: i,
          status: isLocallyReserved || isPreTaken ? 'reserved' : 'available'
        })
      }
    })
    setSeats(newSeats)
  }, [movie, selectedShowtime, reservedSeatsCache])

  if (!selectedShowtime) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[300px] border border-gray-800 rounded-xl bg-black/40 backdrop-blur-md p-6">
        <h3 className="text-xl font-bold font-mono text-white mb-4 tracking-widest text-center">SELECT A SHOWTIME</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {movie.showtimes.map(time => (
            <button
              key={time}
              onClick={() => onSelectShowtime(time)}
              className="px-6 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded hover:bg-[var(--color-primary)] hover:text-black transition-all duration-300 font-mono font-bold tracking-widest hover:shadow-[0_0_15px_var(--color-primary)]"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full border border-gray-800 rounded-xl bg-black/40 backdrop-blur-md p-6 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold font-mono text-white tracking-widest">
          {movie.title} <span className="text-[var(--color-secondary)]">[{selectedShowtime}]</span>
        </h3>
        <button 
          onClick={() => onSelectShowtime('')}
          className="text-xs text-gray-400 hover:text-white font-mono uppercase underline decoration-gray-600 underline-offset-4"
        >
          Change Time
        </button>
      </div>

      {/* Screen Representation */}
      <div className="w-full max-w-2xl relative mb-12">
        <div className="h-2 w-full bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent rounded-full shadow-[0_0_20px_var(--color-primary)] opacity-50" />
        <p className="text-center text-[10px] uppercase font-mono text-[var(--color-primary)] mt-2 tracking-[0.5em] opacity-70">Screen</p>
      </div>

      {/* Seat Grid */}
      <div className="flex flex-col gap-4 max-w-3xl overflow-x-auto pb-4 w-full items-center">
        {ROWS.map(row => (
          <div key={row} className="flex gap-2 sm:gap-4 items-center">
            <span className="w-6 text-center text-xs font-mono font-bold text-gray-500 mr-2">{row}</span>
            <div className="flex gap-2 sm:gap-3">
              {seats.filter(s => s.row === row).map(seat => {
                const isSelected = selectedSeats.some(s => s.id === seat.id)
                const isReserved = seat.status === 'reserved'
                
                let btnClass = "w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg rounded-b-sm font-mono text-xs font-bold transition-all duration-300 relative overflow-hidden"
                
                if (isReserved) {
                  btnClass += " bg-gray-900 border border-gray-800 text-gray-700 cursor-not-allowed"
                } else if (isSelected) {
                  btnClass += " bg-[var(--color-primary)] border border-[var(--color-primary)] text-black shadow-[0_0_10px_var(--color-primary)]"
                } else {
                  btnClass += " bg-gray-800/50 border border-gray-600 text-gray-400 hover:border-[var(--color-primary)] hover:text-white cursor-pointer"
                }

                return (
                  <motion.button
                    key={seat.id}
                    whileHover={!isReserved ? { scale: 1.1 } : {}}
                    whileTap={!isReserved ? { scale: 0.95 } : {}}
                    className={btnClass}
                    onClick={() => !isReserved && onToggleSeat(seat)}
                    disabled={isReserved}
                    title={isReserved ? 'Reserved' : `Seat ${seat.id}`}
                  >
                    {seat.num}
                  </motion.button>
                )
              })}
            </div>
            <span className="w-6 text-center text-xs font-mono font-bold text-gray-500 ml-2">{row}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-8 pt-6 border-t border-gray-800 w-full justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t bg-gray-800/50 border border-gray-600" />
          <span className="text-xs font-mono text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t bg-[var(--color-primary)] shadow-[0_0_5px_var(--color-primary)]" />
          <span className="text-xs font-mono text-gray-400">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t bg-gray-900 border border-gray-800" />
          <span className="text-xs font-mono text-gray-400">Reserved</span>
        </div>
      </div>
    </div>
  )
}
