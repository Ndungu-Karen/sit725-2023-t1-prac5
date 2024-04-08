// Example service file for project-related operations
const Project = require('../models/projectModel');

// Define service functions
const getAllProjects = async () => {
  try {
    return await Project.find();
  } catch (error) {
    throw new Error('Error retrieving projects');
  }
};

const createProject = async (projectData) => {
  try {
    return await Project.create(projectData);
  } catch (error) {
    throw new Error('Error creating project');
  }
};

// Export service functions
module.exports = {
  getAllProjects,
  createProject
};
