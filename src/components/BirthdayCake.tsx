import { motion, useReducedMotion } from 'motion/react'

type Props = { onOpen: () => void }

export function BirthdayCake({ onOpen }: Props) {
  const reduced = useReducedMotion()

  return (
    <main className="phase phase-cake" aria-label="Birthday cake">
      <motion.button
        className="cake-button"
        type="button"
        onClick={onOpen}
        aria-label="Tap the birthday cake to open Kath’s card"
        initial={reduced ? false : { opacity: 0, y: 28, scale: 0.84 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileTap={reduced ? undefined : { scaleX: 1.07, scaleY: 0.91 }}
        transition={{ type: 'spring', stiffness: 220, damping: 17 }}
      >
        <svg className="cake-art" viewBox="0 0 420 470" fill="none" role="img" aria-label="Illustrated cake with three glowing candles">
          <path className="cake-shadow" d="M86 418c62 16 185 17 249-2" />
          <path className="cake-plate" d="M65 390c20 17 81 27 147 27 67 0 128-10 147-27M77 382c56 23 214 24 271 0" />
          <path className="cake-body" d="M91 249c2 40 2 91 1 133 42 19 195 26 237 1l2-133" />
          <path className="cake-body" d="M89 250c34 21 204 28 243-1" />
          <path className="cake-frost" d="M88 251c-2-16 11-29 32-33 48-11 146-12 195 1 18 5 27 17 18 32-10 12-22 6-29 3-8-4-14 2-17 11-4 14-8 24-20 22-10-2-12-15-16-22-4-7-9-8-16-5-10 5-14 12-25 9-12-3-13-22-25-23-10 0-10 20-23 21-14 1-16-17-28-16-10 1-16 12-29 9-10-2-14-7-17-9Z" />
          <path className="cake-heart" d="M211 324c-8-14-25-11-25 3 0 13 16 23 25 30 9-7 25-17 25-30 0-14-17-17-25-3Z" />
          <path className="cake-line" d="M139 216v-65m71 58v-70m72 76v-64" />
          <path className="cake-line" d="M133 153h13m58-13h13m59 13h13" />
          <path className="flame flame-one" d="M139 140c-10-11-7-23 1-35 8 12 12 23-1 35Z" />
          <path className="flame flame-two" d="M210 128c-9-11-7-23 1-35 9 12 11 23-1 35Z" />
          <path className="flame flame-three" d="M282 140c-10-11-7-23 1-35 9 12 12 23-1 35Z" />
          <path className="cake-sparkle" d="M79 170v-20m-10 10h20m261 31v-18m-9 9h18" />
          <path className="cake-small-heart" d="M334 126c-5-8-15-5-15 3 0 7 9 13 15 17 6-4 15-10 15-17 0-8-10-11-15-3Z" />
        </svg>
      </motion.button>
    </main>
  )
}
