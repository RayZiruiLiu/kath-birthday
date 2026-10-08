import type { CSSProperties } from 'react'
import { photos } from '../photos'

function random(seed: number) {
  const x = Math.sin(seed * 127.1 + 13.7) * 43758.5453
  return x - Math.floor(x)
}

export function FallingPhotos() {
  if (!photos.length) return null

  return (
    <div className="falling-photos" aria-hidden="true">
      {Array.from({ length: Math.min(11, Math.max(6, photos.length)) }, (_, i) => {
        const r = (offset: number) => random(i * 13 + offset)
        const vars = {
          '--left': `${4 + r(1) * 90}%`,
          '--width': `${54 + r(2) * 36}px`,
          '--delay': `${-r(3) * 25}s`,
          '--duration': `${16 + r(4) * 13}s`,
          '--drift': `${(r(5) - 0.5) * 150}px`,
          '--sway': `${(r(6) - 0.5) * 75}px`,
          '--start-rotate': `${(r(7) - 0.5) * 26}deg`,
          '--end-rotate': `${(r(8) - 0.5) * 58}deg`,
        } as CSSProperties
        return (
          <div className="falling-track" style={vars} key={i}>
            <div className="falling-sway">
              <div className="falling-print">
                <img
                  src={`${import.meta.env.BASE_URL}print-thumbs/${encodeURIComponent(photos[(i * 7) % photos.length].name)}.webp`}
                  onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = photos[(i * 7) % photos.length].src }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
