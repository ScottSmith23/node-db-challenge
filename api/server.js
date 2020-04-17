const express = require('express');
const helmet = require('helmet');

const projectRouter = require('../projectR/project-router.js');
// const ingredientsRouter = require('../recipebook/ingredients-router.js');
const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectRouter);
// server.use('/api/ingredients', ingredientsRouter);

module.exports = server;
