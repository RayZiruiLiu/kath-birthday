import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { heicCount, photos } from '../photos'

function shufflePhotos<T>(items: T[]): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// One order per page load, shared by every turn of this album session.
const albumPhotos = shufflePhotos(photos)

const pageVariants = {
  initial: (direction: number) => direction < 0
    ? { rotateY: 78, opacity: 0.88, transformOrigin: 'right center', zIndex: 2 }
    : { rotateY: 0, opacity: 1, transformOrigin: 'left center', zIndex: 0 },
  animate: (direction: number) => ({ rotateY: 0, opacity: 1, zIndex: direction < 0 ? 2 : 0 }),
  exit: (direction: number) => direction > 0
    ? { rotateY: -78, opacity: 0.88, transformOrigin: 'left center', zIndex: 2 }
    : { rotateY: 0, opacity: 1, zIndex: 0 },
}

function preload(src?: string) {
  if (src) {
    const image = new Image()
    image.src = src
  }
}

export function PhotoAlbum() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const reduced = useReducedMotion()
  const count = albumPhotos.length

  useEffect(() => {
    if (count < 2) return
    preload(albumPhotos[(index + 1) % count].src)
    preload(albumPhotos[(index - 1 + count) % count].src)
  }, [index, count])

  function turn(step: 1 | -1) {
    if (count < 2) return
    setDirection(step)
    setLoaded(false)
    setError(false)
    setIndex(current => (current + step + count) % count)
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') turn(1)
      if (event.key === 'ArrowLeft') turn(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [count])

  return (
    <main className="phase phase-album" aria-label="Photo album">
      {count ? (
          <div className="album-stage">
            <button className="album-nav album-prev" onClick={() => turn(-1)} disabled={count < 2} aria-label="Previous photo" type="button" />
            <div className="album-photo-area">
              <AnimatePresence custom={direction} mode="sync" initial={false}>
                <motion.div
                  className="album-page"
                  key={albumPhotos[index].src}
                  custom={direction}
                  variants={pageVariants}
                  initial={reduced ? false : 'initial'}
                  animate="animate"
                  exit={reduced ? { opacity: 0 } : 'exit'}
                  transition={{ duration: reduced ? 0.12 : 0.58, ease: [0.36, 0, 0.2, 1] }}
                  drag={count > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -55 || info.velocity.x < -450) turn(1)
                    else if (info.offset.x > 55 || info.velocity.x > 450) turn(-1)
                  }}
                >
                  <div className={count > 1 ? 'album-photo-mat has-stack' : 'album-photo-mat'}>
                    {!loaded && !error && <span className="sr-only" role="status">Loading photo…</span>}
                    {error ? <div className="sr-only" role="alert">This photo could not be loaded.</div> : (
                      <img
                        src={albumPhotos[index].src}
                        alt={`Photo ${index + 1} of ${count}`}
                        draggable={false}
                        onLoad={() => setLoaded(true)}
                        onError={() => setError(true)}
                        style={{ opacity: loaded ? 1 : 0 }}
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <button className="album-nav album-next" onClick={() => turn(1)} disabled={count < 2} aria-label="Next photo" type="button" />
          </div>
      ) : (
        <div className="sr-only" role="status">
          No photos yet. Add JPG, PNG, or WEBP images to the PIC folder, then rebuild the site.
        </div>
      )}
      {count > 0 && <p className="album-note">～最愛每天跟小寶～</p>}
      {heicCount > 0 && <p className="sr-only">{heicCount} HEIC/HEIF photo{heicCount === 1 ? '' : 's'} need conversion to JPG, PNG, or WEBP to appear here.</p>}
    </main>
  )
}
