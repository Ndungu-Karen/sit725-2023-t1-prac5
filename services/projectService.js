// Example service file for project-related operations

// Example data - you can replace this with actual database integration
let projects = [
    { id: 1, name: 'Project 1', description: 'Description for Project 1' },
    { id: 2, name: 'Project 2', description: 'Description for Project 2' },
    // Add more projects as needed
  ];
  
  // Define service functions
  const getAllProjects = () => {
    return projects;
  };
  
  const getProjectById = (projectId) => {
    return projects.find(project => project.id === projectId);
  };
  
  const createProject = (projectData) => {
    // Simulate creating a new project in the database
    const newProject = { id: projects.length + 1, ...projectData };
    projects.push(newProject);
    return newProject;
  };
  
  // Export service functions
  module.exports = {
    getAllProjects,
    getProjectById,
    createProject
  };
  