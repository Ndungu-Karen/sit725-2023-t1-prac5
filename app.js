const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use('/api', routes); // Mount routes under /api prefix

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to your Express.js MVC app!');
});

// Define a route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Define a route for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
