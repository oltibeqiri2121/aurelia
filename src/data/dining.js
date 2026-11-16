import { IMG } from './images';

export const diningImage = IMG.restaurant;
export const diningImage2 = IMG.restaurant2;

export const diningHours = [
  { label: 'Breakfast', time: '07:00 – 10:30' },
  { label: 'Lunch', time: '12:00 – 15:00' },
  { label: 'Dinner', time: '18:30 – 22:30' },
  { label: 'Rooftop Lounge', time: '17:00 – 00:00' },
];

export const menu = {
  Breakfast: [
    { name: 'Aurelia Continental', desc: 'Viennoiserie, seasonal fruit, yoghurt and honeycomb.', price: 22 },
    { name: 'Truffle Scrambled Eggs', desc: 'Soft eggs, brioche, shaved black truffle.', price: 28 },
    { name: 'Smoked Salmon Benedict', desc: 'Poached eggs, hollandaise, rye toast.', price: 26 },
    { name: 'Granola & Berries', desc: 'House granola, labneh, macerated berries.', price: 16 },
  ],
  'Main Courses': [
    { name: 'Seared Sea Bass', desc: 'Saffron fennel, citrus beurre blanc.', price: 46 },
    { name: 'Herb-Crusted Lamb Rack', desc: 'Roasted garlic jus, seasonal vegetables.', price: 58 },
    { name: 'Wild Mushroom Risotto', desc: 'Aged parmesan, truffle oil.', price: 34 },
    { name: 'Dry-Aged Ribeye', desc: 'Pommes purée, peppercorn sauce.', price: 64 },
  ],
  Desserts: [
    { name: 'Dark Chocolate Fondant', desc: 'Salted caramel, vanilla ice cream.', price: 18 },
    { name: 'Lemon & Olive Oil Cake', desc: 'Whipped mascarpone, candied zest.', price: 15 },
    { name: 'Crème Brûlée', desc: 'Madagascan vanilla, shortbread.', price: 14 },
    { name: 'Seasonal Sorbets', desc: 'Three scoops, fresh garnish.', price: 12 },
  ],
  Beverages: [
    { name: 'Aurelia Signature Spritz', desc: 'Champagne, elderflower, citrus.', price: 20 },
    { name: 'Single-Origin Coffee', desc: 'Espresso, americano or flat white.', price: 7 },
    { name: 'Fresh-Pressed Juices', desc: 'Orange, green or seasonal blend.', price: 9 },
    { name: 'Sommelier’s Glass Pour', desc: 'Ask for today’s selection.', price: 18 },
  ],
};
