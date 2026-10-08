import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { BirthdayCake } from './components/BirthdayCake'
import { BirthdayCard } from './components/BirthdayCard'
import { PhotoAlbum } from './components/PhotoAlbum'

type Phase = 'cake' | 'card' | 'album'

export default function App() {
  const [phase, setPhase] = useState<Phase>('cake')
  const reduced = useReducedMotion()

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <motion.div
          className="phase-wrap"
          key={phase}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: reduced ? 0.12 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          {phase === 'cake' && <BirthdayCake onOpen={() => setPhase('card')} />}
          {phase === 'card' && <BirthdayCard onOpenAlbum={() => setPhase('album')} />}
          {phase === 'album' && <PhotoAlbum />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
