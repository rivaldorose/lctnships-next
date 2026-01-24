export const STUDIO_TYPES = [
  { value: 'photo', label: 'Photography Studio', icon: 'Camera' },
  { value: 'video', label: 'Video Studio', icon: 'Video' },
  { value: 'podcast', label: 'Podcast Studio', icon: 'Mic' },
  { value: 'music', label: 'Music Studio', icon: 'Music' },
  { value: 'dance', label: 'Dance Studio', icon: 'Music2' },
  { value: 'creative', label: 'Creative Space', icon: 'Palette' },
] as const

export type StudioType = typeof STUDIO_TYPES[number]['value']
