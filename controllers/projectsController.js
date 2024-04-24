const Project = require('../models/projectModel');

// Controller methods for handling project-related operations

// Controller method to get all projects
exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};

// Controller method to get a project by ID
exports.getProjectById = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

// Controller method to create a new project
exports.createProject = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        const project = await Project.create({ title, description, status });
        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

// Controller method to update a project by ID
exports.updateProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const { title, description, status } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(projectId, { title, description, status }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
};

// Controller method to delete a project by ID
exports.deleteProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        next(error);
    }
};
