// src/config/index.js
require('dotenv').config(); // Load environment variables from .env

const entitySecret = process.env.ENTITY_SECRET;

module.exports = { entitySecret };
