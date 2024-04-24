const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Project = require('../../models/projectModel');

describe('Project Integration Tests', () => {
    let server;

    beforeAll(async () => {
        // Connect to a test database
        await mongoose.connect('mongodb+srv://Ndungu:Ndungu@cluster0.mhjgspt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        server = app.listen(4000);
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

    // Test cases for GET /api/projects
    describe('GET /api/projects', () => {
        it('should return empty array when no projects exist', async () => {
            const res = await request(app).get('/api/projects');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]);
        });

        it('should return projects when projects exist', async () => {
            // Create some projects in the database
            await Project.create({ title: 'Project 1', description: 'Description 1', status: 'Active' });
            await Project.create({ title: 'Project 2', description: 'Description 2', status: 'Inactive' });

            const res = await request(app).get('/api/projects');
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body[0].title).toBe('Project 1');
            expect(res.body[1].title).toBe('Project 2');
        });
    });

    // Test case for POST /api/projects
    describe('POST /api/projects', () => {
        it('should create a new project', async () => {
            const projectData = { title: 'New Project', description: 'New Description', status: 'Active' };
            const res = await request(app)
                .post('/api/projects')
                .send(projectData);
            expect(res.statusCode).toBe(201);
            expect(res.body.title).toBe('New Project');
            expect(res.body.description).toBe('New Description');
            expect(res.body.status).toBe('Active');
        });
    });

    // Test case for PUT /api/projects/:id
    describe('PUT /api/projects/:id', () => {
        it('should update an existing project', async () => {
            // Create a project in the database
            const project = await Project.create({ title: 'Project 1', description: 'Description 1', status: 'Active' });

            // Update the project
            const updatedData = { title: 'Updated Project', description: 'Updated Description', status: 'Inactive' };
            const res = await request(app)
                .put(`/api/projects/${project._id}`)
                .send(updatedData);
            expect(res.statusCode).toBe(200);
            expect(res.body.title).toBe('Updated Project');
            expect(res.body.description).toBe('Updated Description');
            expect(res.body.status).toBe('Inactive');
        });
    });

    // Test case for DELETE /api/projects/:id
    describe('DELETE /api/projects/:id', () => {
        it('should delete an existing project', async () => {
            // Create a project in the database
            const project = await Project.create({ title: 'Project 1', description: 'Description 1', status: 'Active' });

            const res = await request(app).delete(`/api/projects/${project._id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Project deleted successfully');
        });
    });
});
