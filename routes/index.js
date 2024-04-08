const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

// Read all route files in the directory, excluding index.js
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const routeName = file.replace('.js', '');
    const route = require(path.join(__dirname, file));
    router.use(`/${routeName}`, route);
  });

module.exports = router;
