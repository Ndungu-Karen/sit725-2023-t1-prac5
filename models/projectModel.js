const mongoose = require('mongoose');

// Define the project schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Define and export the Project model
module.exports = mongoose.model('Project', projectSchema);
