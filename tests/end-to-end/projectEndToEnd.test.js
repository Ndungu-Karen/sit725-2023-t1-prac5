const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Project = require('../../models/projectModel');

describe('End-to-End Tests', () => {
    let server;
    beforeAll(async () => {
        // Connect to a test database
        await mongoose.connect('mongodb+srv://Ndungu:Ndungu@cluster0.mhjgspt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        server = app.listen(5000);
    });

    afterAll(async () => {
        // Disconnect from the test database
        await mongoose.disconnect();
        server.close();
    });

    beforeEach(async () => {
        // Clear the Project collection before each test
        await Project.deleteMany({});
    });

    afterEach(async () => {
        // Clear the Project collection after each test
        await Project.deleteMany({});
    });

    it('should perform end-to-end testing for project creation, retrieval, update, and deletion', async () => {
        // Create a new project
        const projectData = { title: 'New Project', description: 'New Description', status: 'Active' };
        let res = await request(app)
            .post('/api/projects')
            .send(projectData);
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('New Project');
        const projectId = res.body._id;

        // Retrieve the project by ID
        res = await request(app).get(`/api/projects/${projectId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('New Project');

        // Update the project
        const updatedData = { title: 'Updated Project', description: 'Updated Description', status: 'Inactive' };
        res = await request(app)
            .put(`/api/projects/${projectId}`)
            .send(updatedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated Project');

        // Delete the project
        res = await request(app).delete(`/api/projects/${projectId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Project deleted successfully');
    });
});
