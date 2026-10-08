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
          '--delay': `${-r(3) * 44}s`,
          '--duration': `${30 + r(4) * 14}s`,
          '--drift': `${(r(5) - 0.5) * 34}px`,
          '--sway': `${(r(6) - 0.5) * 28}px`,
          '--base-rotate': `${(r(7) - 0.5) * 14}deg`,
          '--tilt': `${(r(8) - 0.5) * 9}deg`,
          '--float-y': `${5 + r(9) * 5}px`,
          '--float-duration': `${8 + r(10) * 5}s`,
          '--float-delay': `${-r(11) * 13}s`,
          '--rock-duration': `${10 + r(12) * 5}s`,
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
