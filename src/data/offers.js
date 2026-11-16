import { IMG } from './images';

export const offers = [
  { id: 'weekend', title: 'Weekend Escape', image: IMG.exterior1, price: 'Sample: 15% off the example rate', text: 'Two nights of calm with late check-out and a welcome drink on arrival.', includes: ['Two-night stay (Fri–Sun)', 'Welcome drink', 'Late check-out until 2:00 PM'] },
  { id: 'romantic', title: 'Romantic Stay', image: IMG.romantic, price: 'Sample: from $420 / night', text: 'Champagne on arrival, a candlelit dinner for two and a couples’ spa moment.', includes: ['Sparkling wine on arrival', 'Dinner for two', 'Couples’ spa session', 'Rose-petal turn-down'] },
  { id: 'extended', title: 'Extended Stay', image: IMG.suite1, price: 'Sample: stay 5, pay 4', text: 'Linger longer and enjoy a complimentary night plus daily breakfast.', includes: ['Fifth night complimentary', 'Daily breakfast', 'One laundry service'] },
  { id: 'family', title: 'Family Holiday', image: IMG.familyHoliday, price: 'Sample: children stay free', text: 'Children under 12 stay free, with a kids’ welcome pack and family breakfast.', includes: ['Up to two children stay free', 'Kids’ welcome pack', 'Family breakfast'] },
];
