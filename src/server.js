require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const incidentRoutes = require('./routes/incidentRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/incidents', incidentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the AI Safety Incident Log API',
    endpoints: {
      getAllIncidents: 'GET /incidents',
      getIncidentById: 'GET /incidents/:id',
      createIncident: 'POST /incidents',
      deleteIncident: 'DELETE /incidents/:id'
    }
  });
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
}); 