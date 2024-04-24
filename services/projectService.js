const Project = require('../models/projectModel');

// Service to handle CRUD operations for projects
const projectService = {
    // Get all projects
    async getAllProjects() {
        try {
            const projects = await Project.find();
            return projects;
        } catch (error) {
            throw new Error('Error fetching projects from the database');
        }
    },

    // Get a project by ID
    async getProjectById(id) {
        try {
            const project = await Project.findById(id);
            if (!project) {
                throw new Error('Project not found');
            }
            return project;
        } catch (error) {
            throw new Error('Error fetching project from the database');
        }
    },

    // Create a new project
    async createProject(projectData) {
        try {
            const project = new Project(projectData);
            await project.save();
            return project;
        } catch (error) {
            throw new Error('Error creating project in the database');
        }
    },

    // Update an existing project
    async updateProject(id, updatedProjectData) {
        try {
            const project = await Project.findByIdAndUpdate(id, updatedProjectData, { new: true });
            if (!project) {
                throw new Error('Project not found');
            }
            return project;
        } catch (error) {
            throw new Error('Error updating project in the database');
        }
    },

    // Delete a project
    async deleteProject(id) {
        try {
            const project = await Project.findByIdAndDelete(id);
            if (!project) {
                throw new Error('Project not found');
            }
            return { message: 'Project deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting project from the database');
        }
    }
};

module.exports = projectService;
