const express = require('express');
const router = express.Router();

// Import the projectService to handle business logic
const projectService = require('../services/projectService');

// Define route handlers for different CRUD operations on projects

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a project by ID
router.get('/:id', async (req, res) => {
    const projectId = req.params.id;
    try {
        const project = await projectService.getProjectById(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new project
router.post('/', async (req, res) => {
    const projectData = req.body;
    try {
        const newProject = await projectService.createProject(projectData);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT (update) an existing project by ID
router.put('/:id', async (req, res) => {
    const projectId = req.params.id;
    const updatedProjectData = req.body;
    try {
        const updatedProject = await projectService.updateProject(projectId, updatedProjectData);
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a project by ID
router.delete('/:id', async (req, res) => {
    const projectId = req.params.id;
    try {
        await projectService.deleteProject(projectId);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
