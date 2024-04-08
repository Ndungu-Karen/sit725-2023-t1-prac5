const express = require('express');
const projectsController = require('../controllers').projectsController;

const router = express.Router();

// Define routes for project-related endpoints
router.get('/', projectsController.getProjects);
router.post('/', projectsController.createProject);

module.exports = router;
