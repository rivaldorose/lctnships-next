export const AMENITIES = [
  { value: 'wifi', label: 'WiFi', icon: 'Wifi' },
  { value: 'parking', label: 'Parking', icon: 'Car' },
  { value: 'airco', label: 'Air Conditioning', icon: 'Wind' },
  { value: 'kitchen', label: 'Kitchen', icon: 'UtensilsCrossed' },
  { value: 'bathroom', label: 'Bathroom', icon: 'Bath' },
  { value: 'changing_room', label: 'Changing Room', icon: 'DoorOpen' },
  { value: 'sound_system', label: 'Sound System', icon: 'Speaker' },
  { value: 'lighting_equipment', label: 'Lighting Equipment', icon: 'Lightbulb' },
  { value: 'backdrop', label: 'Backdrop', icon: 'Image' },
  { value: 'props', label: 'Props', icon: 'Box' },
  { value: 'green_screen', label: 'Green Screen', icon: 'Square' },
  { value: 'makeup_station', label: 'Makeup Station', icon: 'Sparkles' },
  { value: 'wardrobe', label: 'Wardrobe', icon: 'Shirt' },
  { value: 'refreshments', label: 'Refreshments', icon: 'Coffee' },
  { value: 'wheelchair_accessible', label: 'Wheelchair Accessible', icon: 'Accessibility' },
] as const

export type Amenity = typeof AMENITIES[number]['value']
