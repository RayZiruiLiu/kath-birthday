import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { heicCount, photos } from '../photos'

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
  const count = photos.length

  useEffect(() => {
    preload(photos[index + 1]?.src)
    preload(photos[index - 1]?.src)
  }, [index])

  function go(next: number) {
    if (next < 0 || next >= count || next === index) return
    setDirection(next > index ? 1 : -1)
    setLoaded(false)
    setError(false)
    setIndex(next)
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') go(index + 1)
      if (event.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, count])

  return (
    <main className="phase phase-album" aria-label="Photo album">
      <header className="album-header">
        <span className="album-wordmark">Kath <span>♡</span></span>
        <span className="album-header-label">the little album</span>
      </header>
      {count ? (
        <>
          <div className="album-stage">
            <button className="album-nav album-prev" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous photo" type="button">←</button>
            <div className="album-photo-area">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  className="album-page"
                  key={photos[index].src}
                  custom={direction}
                  initial={reduced ? false : { opacity: 0, x: direction * 50, rotate: direction * 1.5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -40, rotate: direction * -1 }}
                  transition={{ duration: reduced ? 0.12 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                  drag={count > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -55 || info.velocity.x < -450) go(index + 1)
                    else if (info.offset.x > 55 || info.velocity.x > 450) go(index - 1)
                  }}
                >
                  <div className="album-photo-mat">
                    {!loaded && !error && <span className="photo-loading" role="status">Loading photo…</span>}
                    {error ? <div className="photo-error" role="alert">This photo could not be loaded.</div> : (
                      <img
                        src={photos[index].src}
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
            <button className="album-nav album-next" onClick={() => go(index + 1)} disabled={index === count - 1} aria-label="Next photo" type="button">→</button>
          </div>
          <footer className="album-footer">
            <span className="album-hint">swipe to turn</span>
            <div className="album-progress" aria-label={`Photo ${index + 1} of ${count}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div className="album-progress-line"><span style={{ width: `${((index + 1) / count) * 100}%` }} /></div>
              <span>{String(count).padStart(2, '0')}</span>
            </div>
          </footer>
        </>
      ) : (
        <div className="album-empty" role="status">
          <span aria-hidden="true">♡</span>
          <p>No photos yet.</p>
          <small>Add JPG, PNG, or WEBP images to the PIC folder, then rebuild the site.</small>
        </div>
      )}
      {heicCount > 0 && <p className="heic-warning">{heicCount} HEIC/HEIF photo{heicCount === 1 ? '' : 's'} need conversion to JPG, PNG, or WEBP to appear here.</p>}
    </main>
  )
}
