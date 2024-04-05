const fs = require('fs');
const path = require('path');

const services = {};

// Read all service files in the directory, excluding index.js
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const serviceName = file.replace('.js', '');
    services[serviceName] = require(path.join(__dirname, file));
  });

module.exports = services;
