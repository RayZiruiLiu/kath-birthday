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
        const width = 54 + r(2) * 36
        const vars = {
          '--left': `${4 + r(1) * 90}%`,
          '--width': `${width}px`,
          '--start-top': `${-(width * 1.25 + 12)}px`,
          '--delay': `${i === 0 ? 0 : 0.25 + i * 0.9 + r(3) * 0.4}s`,
          '--duration': `${27 + r(4) * 12}s`,
          '--drift': `${(r(5) - 0.5) * 58}px`,
          '--sway': `${(r(6) - 0.5) * 24}px`,
          '--base-rotate': `${(r(7) - 0.5) * 12}deg`,
          '--tilt': `${(r(8) < 0.5 ? -1 : 1) * (5 + r(14) * 8)}deg`,
          '--float-y': `${2 + r(9) * 3}px`,
          '--float-duration': `${9 + r(10) * 4}s`,
          '--float-delay': `${-r(11) * 13}s`,
          '--rock-duration': `${8 + r(12) * 5}s`,
          '--rock-delay': `${-r(13) * 15}s`,
        } as CSSProperties
        return (
          <div className="falling-track" style={vars} key={i}>
            <div className="falling-sway">
              <div className="falling-print">
                <img
                  src={`${import.meta.env.BASE_URL}print-thumbs/${encodeURIComponent(photos[(i * 7) % photos.length].name)}.webp`}
                  onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = photos[(i * 7) % photos.length].src }}
                  alt=""
                  loading={i === 0 ? 'eager' : 'lazy'}
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
