export const CITIES = [
  { value: 'amsterdam', label: 'Amsterdam' },
  { value: 'rotterdam', label: 'Rotterdam' },
  { value: 'den-haag', label: 'Den Haag' },
  { value: 'utrecht', label: 'Utrecht' },
  { value: 'eindhoven', label: 'Eindhoven' },
  { value: 'groningen', label: 'Groningen' },
  { value: 'tilburg', label: 'Tilburg' },
  { value: 'almere', label: 'Almere' },
  { value: 'breda', label: 'Breda' },
  { value: 'nijmegen', label: 'Nijmegen' },
] as const

export type City = typeof CITIES[number]['value']
