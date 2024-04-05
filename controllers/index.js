const fs = require('fs');
const path = require('path');

const controllers = {};

// Read all controller files in the directory, excluding index.js
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const controllerName = file.replace('.js', '');
    controllers[controllerName] = require(path.join(__dirname, file));
  });

module.exports = controllers;
