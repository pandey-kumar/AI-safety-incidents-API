const express = require('express');
const router = express.Router();
const { 
  getAllIncidents, 
  getIncidentById, 
  createIncident, 
  deleteIncident 
} = require('../controllers/incidentController');

// GET all incidents
router.get('/', getAllIncidents);

// GET incident by ID
router.get('/:id', getIncidentById);

// POST create new incident
router.post('/', createIncident);

// DELETE incident by ID
router.delete('/:id', deleteIncident);

module.exports = router; 