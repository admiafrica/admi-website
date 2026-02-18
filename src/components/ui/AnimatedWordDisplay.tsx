'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Paragraph from './Paragraph'

type Props = {
  words: any
  interval?: number
  size?: string
  className?: string
  fontFamily?: string
  fontWeight?: number
}

export default function AnimatedWordDisplay({ words, size, fontFamily, fontWeight, interval = 2000 }: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words, interval])

  const wordVariants = {
    enter: {
      opacity: 0
    },
    center: {
      zIndex: 1,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      opacity: 0
    }
  }

  const wordTransition = {
    type: 'tween' as const,
    duration: 0.5,
    ease: 'easeInOut' as const
  }

  return (
    <div style={{ position: 'relative', height: '60px', width: '300px', overflow: 'hidden' }}>
      <AnimatePresence initial={false}>
        {' '}
        {/* No custom prop needed for fade */}
        <motion.div
          key={words[currentWordIndex].word}
          variants={wordVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={wordTransition}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex'
          }}
        >
          <Paragraph
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            size={size}
            className={words[currentWordIndex].styles}
          >
            {words[currentWordIndex].word}
          </Paragraph>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
