const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');
 
// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // Get data from body  
  const { title, url, techs } = request.body
  const likes = 0
  
  // Set one specific repository, with a new uuid and 0 likes 
  const repository = { id: uuid(), title, url, techs, likes }
  
  // Push one element to array 
  repositories.push(repository)

  // Return a json from the brand new repository 
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
