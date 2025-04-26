require('dotenv').config();
const mongoose = require('mongoose');
const Incident = require('../models/incident');
const connectDB = require('../config/db');

// Sample incidents data
const sampleIncidents = [
  {
    title: 'AI Chatbot Produced Harmful Content',
    description: 'An AI chatbot deployed in a customer service application started generating harmful and inappropriate responses after being exposed to biased training data.',
    severity: 'High',
    reported_at: new Date('2023-07-15')
  },
  {
    title: 'AI Facial Recognition False Identification',
    description: 'The facial recognition system incorrectly identified an innocent person as a wanted criminal, leading to a brief detention by authorities.',
    severity: 'Medium',
    reported_at: new Date('2023-09-23')
  },
  {
    title: 'AI Recommendation Algorithm Reinforcing Bias',
    description: 'A content recommendation algorithm was found to be reinforcing existing biases by preferentially suggesting content that aligned with users\' pre-existing views.',
    severity: 'Low',
    reported_at: new Date('2023-11-05')
  }
];

// Connect to the database
connectDB();

// Seed function
const seedDB = async () => {
  try {
    // Clear existing data
    await Incident.deleteMany({});
    console.log('Database cleared');
    
    // Insert sample incidents
    await Incident.insertMany(sampleIncidents);
    console.log('Database seeded successfully with sample incidents');
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('MongoDB disconnected');
    
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    mongoose.disconnect();
    process.exit(1);
  }
};

// Execute the seed function
seedDB(); 