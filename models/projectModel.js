const mongoose = require('mongoose');

// Define the project schema
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Create a model using the project schema
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
