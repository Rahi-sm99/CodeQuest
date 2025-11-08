"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PokeballTransitionProps {
  isOpen: boolean
  onComplete?: () => void
}

export function PokeballTransition({ isOpen, onComplete }: PokeballTransitionProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        onComplete?.()
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md"
        >
          <motion.div
            className="relative w-40 h-40"
            initial={{ scale: 0.6, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500" />
              <div className="absolute inset-6 rounded-full bg-black/30" />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-20 text-2xl font-gaming text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            LOADING...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
