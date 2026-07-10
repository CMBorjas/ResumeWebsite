'use client'

import { motion } from 'framer-motion'
import { Movie } from '../../lib/movies'
import { Seat } from './SeatSelector'
import { CreditCard, CheckCircle } from 'lucide-react'

type CheckoutTerminalProps = {
  movie: Movie
  selectedShowtime: string
  selectedSeats: Seat[]
  onConfirm: () => void
  isConfirmed: boolean
}

export default function CheckoutTerminal({ 
  movie, 
  selectedShowtime, 
  selectedSeats, 
  onConfirm,
  isConfirmed
}: CheckoutTerminalProps) {
  
  const subtotal = selectedSeats.length * movie.price
  const fee = selectedSeats.length > 0 ? 2.50 : 0
  const total = subtotal + fee

  if (isConfirmed) {
    return (
      <div className="w-full h-full min-h-[300px] border border-green-500 rounded-xl bg-black/60 backdrop-blur-md p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-green-500/5 mix-blend-overlay" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
        >
          <CheckCircle className="w-16 h-16 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold font-mono text-white tracking-widest uppercase text-center mb-2">
          Reservation Locked
        </h3>
        <p className="text-green-400 font-mono text-center text-sm mb-6">
          Access keys encrypted and stored in local memory.
        </p>
        <div className="bg-black border border-green-900 rounded p-4 w-full max-w-sm text-sm font-mono text-gray-400 space-y-2">
          <div className="flex justify-between"><span>Movie:</span> <span className="text-white">{movie.title}</span></div>
          <div className="flex justify-between"><span>Time:</span> <span className="text-white">{selectedShowtime}</span></div>
          <div className="flex justify-between"><span>Seats:</span> <span className="text-white">{selectedSeats.map(s => s.id).join(', ')}</span></div>
          <div className="border-t border-gray-800 pt-2 mt-2 flex justify-between font-bold">
            <span>Total Paid:</span> <span className="text-green-400">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    )
  }

  if (selectedSeats.length === 0) {
    return (
      <div className="w-full h-full min-h-[300px] border border-gray-800 rounded-xl bg-black/40 backdrop-blur-md p-6 flex items-center justify-center text-gray-500 font-mono italic text-center">
        Awaiting seat selection...
      </div>
    )
  }

  return (
    <div className="w-full h-full border border-[var(--color-primary)] rounded-xl bg-black/60 backdrop-blur-md p-6 flex flex-col font-mono relative">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-30 mix-blend-overlay" />
      
      <h3 className="text-lg font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
        <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
        Terminal Checkout
      </h3>

      <div className="flex-grow space-y-4 text-sm z-20">
        <div className="flex justify-between items-end">
          <div className="text-gray-400">Target:</div>
          <div className="text-white text-right max-w-[60%]">{movie.title}</div>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-gray-400">Chronos:</div>
          <div className="text-[var(--color-primary)]">{selectedShowtime}</div>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-gray-400">Nodes:</div>
          <div className="text-white">{selectedSeats.map(s => s.id).join(', ')}</div>
        </div>

        <div className="my-6 border-t border-dashed border-gray-700" />

        <div className="flex justify-between items-end">
          <div className="text-gray-500">Subtotal:</div>
          <div className="text-gray-300">${subtotal.toFixed(2)}</div>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-gray-500">Network Fee:</div>
          <div className="text-gray-300">${fee.toFixed(2)}</div>
        </div>
        
        <div className="pt-4 flex justify-between items-end">
          <div className="text-gray-300 uppercase font-bold tracking-widest">Total:</div>
          <div className="text-2xl font-bold text-[var(--color-primary)] drop-shadow-[0_0_5px_var(--color-primary)]">
            ${total.toFixed(2)}
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="mt-8 z-20 w-full py-4 bg-[var(--color-primary)] text-black font-bold uppercase tracking-[0.2em] rounded hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(0,255,225,0.4)]"
      >
        Authorize Transfer
      </button>
    </div>
  )
}
