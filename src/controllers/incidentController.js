const Incident = require('../models/incident');

// Get all incidents
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ reported_at: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving incidents', error: error.message });
  }
};

// Get incident by ID
exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving incident', error: error.message });
  }
};

// Create new incident
exports.createIncident = async (req, res) => {
  try {
    const { title, description, severity } = req.body;
    
    // Basic validation
    if (!title || !description || !severity) {
      return res.status(400).json({ message: 'Please provide title, description, and severity' });
    }
    
    // Validate severity
    if (!['Low', 'Medium', 'High'].includes(severity)) {
      return res.status(400).json({ message: 'Severity must be Low, Medium, or High' });
    }
    
    const newIncident = await Incident.create({
      title,
      description,
      severity,
      reported_at: new Date()
    });
    
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error creating incident', error: error.message });
  }
};

// Delete incident
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    
    await incident.deleteOne();
    
    res.status(200).json({ message: 'Incident successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting incident', error: error.message });
  }
}; 