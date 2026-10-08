const supported = import.meta.glob('../PIC/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const heic = import.meta.glob('../PIC/*.{heic,heif,HEIC,HEIF}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export type Photo = { src: string; name: string }

export const photos: Photo[] = Object.entries(supported)
  .map(([path, src]) => ({ src, name: path.split('/').pop() ?? path }))
  .sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))

export const heicCount = Object.keys(heic).length
