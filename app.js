const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api', routes); // Mount routes under /api prefix
// Define a route for the root URL
const Project = require('./models/projectModel');

// Define an array of sample projects
const sampleProjects = [
  { name: 'Project 1', description: 'Description for Project 1' },
  { name: 'Project 2', description: 'Description for Project 2' },
  { name: 'Project 3', description: 'Description for Project 3' }
];

// Insert sample projects into the database
Project.insertMany(sampleProjects)
  .then(() => {
    console.log('Sample projects inserted successfully');
  })
  .catch(error => {
    console.error('Error inserting sample projects:', error);
  });

app.get('/', async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.find();

    // Send the projects data as a response
    res.json(projects);
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://Ndungu:Ndungu@cluster0.mhjgspt.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successfully connecting to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
