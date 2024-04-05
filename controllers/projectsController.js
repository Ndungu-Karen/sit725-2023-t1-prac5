// Example controller file for project-related logic

const projectService = require('../services/projectService');

// Define controller functions
const getProjects = (req, res) => {
  // Logic to fetch projects
  const projects = projectService.getAllProjects();
  res.json(projects);
};

const createProject = (req, res) => {
  // Logic to create a new project
  const projectData = req.body;
  const newProject = projectService.createProject(projectData);
  res.status(201).json(newProject);
};

// Export controller functions
module.exports = {
  getProjects,
  createProject
};
