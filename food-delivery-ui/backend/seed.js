require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/food-delivery';

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB for seeding');

  // Clear existing data
  await Restaurant.deleteMany({});
  await MenuItem.deleteMany({});
  
  // Seed Restaurants
  const restaurant1 = new Restaurant({
    name: 'The Green Garden',
    description: 'Fresh, organic, and locally sourced salads and bowls.',
    location: '123 Health Ave, New York',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  });
  
  const restaurant2 = new Restaurant({
    name: 'Luigi\'s Pizzeria',
    description: 'Authentic Italian pizza made with passion.',
    location: '456 Pizza St, New York',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  });
  
  const restaurant3 = new Restaurant({
    name: 'Burger Joint',
    description: 'Premium gourmet burgers and fries.',
    location: '789 Burger Blvd, New York',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  });
  
  await restaurant1.save();
  await restaurant2.save();
  await restaurant3.save();
  
  console.log('Restaurants seeded');
  
  // Seed Menu Items
  const menuItems = [
    {
      name: 'The Garden Bowl',
      description: 'Artisan quinoa base topped with flame-seared avocado and heirloom carrots.',
      price: 18.50,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      restaurantId: restaurant1._id
    },
    {
      name: 'Kale Salad',
      description: 'Fresh organic kale with lemon vinaigrette.',
      price: 12.00,
      image: 'https://plus.unsplash.com/premium_photo-1673590981774-d9f534e0c601?q=80&w=500&auto=format&fit=crop',
      restaurantId: restaurant1._id
    },
    {
      name: 'Truffle Pepperoni',
      description: 'Hand-stretched sourdough, 24-hour aged mozzarella, and white truffle oil.',
      price: 22.00,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      restaurantId: restaurant2._id
    },
    {
      name: 'Margherita Pizza',
      description: 'Classic tomato, mozzarella, and fresh basil.',
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop',
      restaurantId: restaurant2._id
    },
    {
      name: 'Wagyu Signature',
      description: 'Aged Wagyu beef patty, house-made onion jam, and sharp Vermont cheddar.',
      price: 24.80,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      restaurantId: restaurant3._id
    },
    {
      name: 'Spicy Thai Noodle',
      description: 'Rice noodles immersed in vibrant chili broth, topped with fresh scallion.',
      price: 16.50,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      restaurantId: restaurant1._id
    }
  ];
  
  await MenuItem.insertMany(menuItems);
  console.log('Menu items seeded');
  
  mongoose.connection.close();
  console.log('Database seeded successfully');
})
.catch((err) => {
  console.error('Error seeding data:', err);
  mongoose.connection.close();
});
