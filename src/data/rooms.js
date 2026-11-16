import { IMG } from './images';

export const rooms = [
  {
    id: 'deluxe-garden-room',
    name: 'Deluxe Garden Room',
    category: 'Rooms',
    tagline: 'Quiet elegance overlooking the gardens',
    description: 'An elegant interior with a king-size bed, private marble bathroom and calming garden views.',
    details:
      'Warm neutral tones, hand-finished timber and soft linen set the mood in this serene retreat. Floor-to-ceiling windows frame the gardens, while a deep soaking tub and rainfall shower make the bathroom a destination of its own. This is a fictional room created for demonstration purposes.',
    maxGuests: 2, size: 38, bed: 'King-size bed', view: 'Garden view', price: 280, inventory: 8, order: 1,
    amenities: ['King-size bed', 'Private marble bathroom', 'Garden view', 'Rainfall shower', 'Complimentary Wi-Fi', 'Smart TV', 'Espresso machine', 'In-room safe', 'Air conditioning', 'Premium bath amenities'],
    images: [IMG.deluxe1, IMG.deluxe2, IMG.deluxe3],
  },
  {
    id: 'deluxe-city-room',
    name: 'Deluxe City Room',
    category: 'Rooms',
    tagline: 'Skyline views and refined comfort',
    description: 'A sophisticated room with a king-size bed, private bathroom and sweeping city views from a high floor.',
    details:
      'Set on a higher floor, this room pairs a calm palette with a panoramic city outlook. A writing desk, curated minibar and generous bathroom make it equally suited to business and leisure. This is a fictional room created for demonstration purposes.',
    maxGuests: 2, size: 40, bed: 'King-size bed', view: 'City view', price: 310, inventory: 6, order: 2,
    amenities: ['King-size bed', 'Private bathroom with bathtub', 'City view', 'Writing desk', 'Complimentary Wi-Fi', 'Smart TV', 'Curated minibar', 'In-room safe', 'Air conditioning', 'Turn-down service'],
    images: [IMG.deluxe2, IMG.deluxe1, IMG.deluxe3],
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    category: 'Suites',
    tagline: 'Space to unwind, room to entertain',
    description: 'A spacious living area, premium furnishings, a king-size bed and enhanced amenities for longer stays.',
    details:
      'A separate living room with a plush sofa and dining nook sits beside the bedroom, finished in rich textures and soft lighting. Enjoy lounge access, a Nespresso bar and priority service as part of the demonstration package. This is a fictional suite created for demonstration purposes.',
    maxGuests: 3, size: 62, bed: 'King-size bed', view: 'City or pool view', price: 480, inventory: 4, order: 3,
    amenities: ['King-size bed', 'Separate living area', 'Premium furnishings', 'Marble bathroom with bathtub', 'Lounge access', 'Nespresso bar', 'Complimentary Wi-Fi', 'Dining nook', 'Bathrobes & slippers', 'Priority room service'],
    images: [IMG.suite1, IMG.suite2, IMG.suite3],
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite',
    category: 'Suites',
    tagline: 'Our most exclusive address',
    description: 'Expansive living space, a luxury bathroom, a private lounge and premium accommodation throughout.',
    details:
      'The crown of the hotel: a sweeping suite with a private lounge, formal dining table, walk-in dressing room and a spa-inspired bathroom with a freestanding tub. A dedicated butler and private airport transfer complete the experience in this demonstration. This is a fictional suite.',
    maxGuests: 4, size: 140, bed: 'King-size bed + sofa bed', view: 'Panoramic view', price: 1250, inventory: 2, order: 4,
    amenities: ['King-size bed', 'Private lounge', 'Luxury bathroom with freestanding tub', 'Walk-in dressing room', 'Formal dining area', 'Dedicated butler', 'Private airport transfer', 'Complimentary Wi-Fi', 'Premium minibar', 'Daily floral arrangement'],
    images: [IMG.pres1, IMG.pres2, IMG.suite2],
  },
  {
    id: 'family-room',
    name: 'Family Room',
    category: 'Family',
    tagline: 'Comfort for the whole family',
    description: 'A comfortable family layout with extra sleeping space and family-friendly amenities.',
    details:
      'Two sleeping zones keep everyone comfortable: a king-size bed for parents and twin beds or a sofa bed for children. Child-friendly touches, extra storage and a connecting-room option make family holidays easy. This is a fictional room created for demonstration purposes.',
    maxGuests: 4, size: 55, bed: 'King bed + two single beds', view: 'Garden or pool view', price: 360, inventory: 5, order: 5,
    amenities: ['King-size bed', 'Two single beds / sofa bed', 'Family-friendly amenities', 'Child-safe minibar', 'Kids’ bathrobes', 'Complimentary Wi-Fi', 'Smart TV with kids’ channels', 'Extra storage', 'Connecting-room option', 'Baby cot on request'],
    images: [IMG.family1, IMG.family2, IMG.deluxe1],
  },
];

export const getRoom = (id) => rooms.find((r) => r.id === id);
export const roomCategories = ['All', 'Rooms', 'Suites', 'Family'];
