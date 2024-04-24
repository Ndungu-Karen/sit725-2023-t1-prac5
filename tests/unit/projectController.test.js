const request = require('supertest');
const app = require('../../app');
const projectService = require('../../services/projectService');


describe('Project Controller', () => {
    // Mock project data for testing
    const mockProject = {
        _id: '6092e6026e753a001b61b2c8',
        title: 'Test Project',
        description: 'This is a test project',
        status: 'Active',
        created_at: '2021-05-05T00:00:00.000Z'
    };

    // Mock project data for create project test
    const createProjectData = {
        title: 'New Project',
        description: 'This is a new project',
        status: 'Active'
    };

    // Mock project ID for testing
    const projectId = '6092e6026e753a001b61b2c8';

    // Mock project update data for testing
    const updateProjectData = {
        title: 'Updated Project',
        description: 'This is an updated project',
        status: 'Inactive'
    };

    // Mock error message
    const errorMessage = 'Error processing request';

    // Mock projectService methods
    projectService.createProject = jest.fn(() => mockProject);
    projectService.getAllProjects = jest.fn(() => [mockProject]);
    projectService.getProjectById = jest.fn(() => mockProject);
    projectService.updateProject = jest.fn(() => mockProject);
    projectService.deleteProject = jest.fn(() => ({ message: 'Project deleted successfully' }));
    
    // Test cases for GET /api/projects
    describe('GET /api/projects', () => {
        it('should return all projects', async () => {
            const res = await request(app).get('/api/projects');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([mockProject]);
        });

        it('should handle errors', async () => {
            projectService.getAllProjects = jest.fn(() => { throw new Error(errorMessage) });
            const res = await request(app).get('/api/projects');
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual(errorMessage);
        });
    });

    // Test cases for GET /api/projects/:id
    describe('GET /api/projects/:id', () => {
        it('should return a project by ID', async () => {
            const res = await request(app).get(`/api/projects/${projectId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockProject);
        });

        it('should handle errors', async () => {
            projectService.getProjectById = jest.fn(() => { throw new Error(errorMessage) });
            const res = await request(app).get(`/api/projects/${projectId}`);
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual(errorMessage);
        });
    });

    // Test cases for POST /api/projects
    describe('POST /api/projects', () => {
        it('should create a new project', async () => {
            const res = await request(app)
                .post('/api/projects')
                .send(createProjectData);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual(mockProject);
        });

        it('should handle errors', async () => {
            projectService.createProject = jest.fn(() => { throw new Error(errorMessage) });
            const res = await request(app)
                .post('/api/projects')
                .send(createProjectData);
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual(errorMessage);
        });
    });

    // Test cases for PUT /api/projects/:id
    describe('PUT /api/projects/:id', () => {
        it('should update a project', async () => {
            const res = await request(app)
                .put(`/api/projects/${projectId}`)
                .send(updateProjectData);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockProject);
        });

        it('should handle errors', async () => {
            projectService.updateProject = jest.fn(() => { throw new Error(errorMessage) });
            const res = await request(app)
                .put(`/api/projects/${projectId}`)
                .send(updateProjectData);
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual(errorMessage);
        });
    });

    // Test cases for DELETE /api/projects/:id
    describe('DELETE /api/projects/:id', () => {
        it('should delete a project', async () => {
            const res = await request(app).delete(`/api/projects/${projectId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Project deleted successfully');
        });

        it('should handle errors', async () => {
            projectService.deleteProject = jest.fn(() => { throw new Error(errorMessage) });
            const res = await request(app).delete(`/api/projects/${projectId}`);
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual(errorMessage);
        });
    });
});
