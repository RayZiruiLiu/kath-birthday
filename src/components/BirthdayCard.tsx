import { motion, useReducedMotion } from 'motion/react'
import { FallingPhotos } from './FallingPhotos'

type Props = { onOpenAlbum: () => void }

function KissFace() {
  return (
    <svg className="kiss-face" viewBox="0 0 100 100" fill="none" role="img" aria-label="Kissing face doodle">
      <path d="M79 26c-9-13-25-19-42-14C17 18 8 37 13 57c5 21 24 32 43 27 19-5 31-25 27-44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M27 43c4-5 10-5 14-1m21-2c4-4 10-3 13 1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="27" cy="58" r="3.5" fill="currentColor" /><circle cx="72" cy="56" r="3.5" fill="currentColor" />
      <path d="M47 57c2-2 7-3 10 0 1 3-1 4-4 5 4 2 4 6 1 9-4 2-10 0-12-3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M86 35c4-5 9-5 12-1-1 4-6 6-12 7" stroke="#b9858b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function BirthdayCard({ onOpenAlbum }: Props) {
  const reduced = useReducedMotion()
  return (
    <main className="phase phase-card" aria-label="Birthday card for Kath">
      <FallingPhotos />
      <motion.section
        className="card-paper"
        initial={reduced ? false : { opacity: 0, y: 32, rotate: -3, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Birthday message"
      >
        <svg className="card-outline" viewBox="0 0 600 760" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 24 Q30 13 110 18 C235 21 392 11 557 19 Q577 19 579 41 C583 174 576 351 582 573 Q585 701 576 741 Q552 748 431 744 C265 743 130 752 30 741 Q16 735 17 705 C12 568 22 425 16 293 Q12 144 20 24Z" />
          <path className="outline-accent" d="M25 36c-2 89-2 178-1 245M48 738c87 7 155 5 211 3M565 31c10 75 7 150 8 198" />
        </svg>
        <div className="card-content">
          <span className="card-top-heart" aria-hidden="true">♡</span>
          <div className="card-message">
            <h1>小寶生日快樂！</h1>
            <p>最愛小隻寶 ～～ ♡♡</p>
            <KissFace />
          </div>
          <div className="card-footer">
            <span className="signature">LERRRAY <span>♡</span> Kathryyyun</span>
            <motion.button
              type="button"
              className="heart-arrow"
              onClick={onOpenAlbum}
              whileTap={reduced ? undefined : { scale: 0.86, x: 5 }}
              aria-label="Open the photo album"
            >
              <svg viewBox="0 0 102 51" fill="none" aria-hidden="true">
                <path d="M8 8c23-4 54-4 85 0M7 42c30 4 59 4 87 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 26c17-2 50-1 65 0m-12-11 15 11-15 11" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M36 18c-4-7-13-4-13 2 0 7 8 12 13 15 5-3 13-8 13-15 0-6-9-9-13-2Z" fill="#b9858b" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.section>
      <span className="card-outer-doodle doodle-one" aria-hidden="true">♡</span>
      <span className="card-outer-doodle doodle-two" aria-hidden="true">✳</span>
      <span className="card-outer-doodle doodle-three" aria-hidden="true">♡</span>
    </main>
  )
}
