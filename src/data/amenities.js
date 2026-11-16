import { Waves, Flower2, Dumbbell, UtensilsCrossed, Wine, Wifi, ConciergeBell, Plane } from 'lucide-react';
import { IMG } from './images';

export const amenities = [
  { id: 'pool', icon: Waves, title: 'Infinity Swimming Pool', text: 'Glide toward the horizon in a heated infinity pool, with attentive poolside service.', image: IMG.pool },
  { id: 'spa', icon: Flower2, title: 'Spa & Wellness Centre', text: 'Restorative treatments, thermal suites and quiet relaxation spaces.', image: IMG.spa },
  { id: 'fitness', icon: Dumbbell, title: 'Fitness Centre', text: 'Modern equipment and natural light for training at your own pace.', image: IMG.gym },
  { id: 'dining', icon: UtensilsCrossed, title: 'Fine Dining Restaurant', text: 'Seasonal tasting menus and a thoughtful wine list in an elegant dining room.', image: IMG.restaurant },
  { id: 'rooftop', icon: Wine, title: 'Rooftop Lounge', text: 'Signature cocktails and golden-hour views above the skyline.', image: IMG.rooftop },
  { id: 'wifi', icon: Wifi, title: 'Complimentary Wi-Fi', text: 'Fast, reliable connectivity throughout rooms and public spaces.', image: IMG.lobby },
  { id: 'service', icon: ConciergeBell, title: 'Room Service', text: 'Curated in-room dining, delivered with discretion and care.', image: IMG.breakfast },
  { id: 'transfer', icon: Plane, title: 'Airport Transfer', text: 'Arrive in comfort with a chauffeured transfer, arranged in advance.', image: IMG.transfer },
];
