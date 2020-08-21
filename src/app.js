const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');
const { restart } = require("nodemon");
 
// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;
  
  // The only way to change likes property is using appropriate resource 
  const likes = 0;

  const repository = { id: uuid(), title, url, techs, likes }
  
  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repositoryIndex = repositories.findIndex( (repo) => repo.id === id ); 
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: `id not found: ${id}`})
  }
 
  // Saving likes before change object
  const { likes } = repositories[repositoryIndex]; 

  repository = { id, title, url, techs, likes }

  repositories[repositoryIndex] = repository;

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params; 
  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex < 0 ) {
    return response.status(400).json({ error: "Invalid id"})
  }

  // Delete repository and return 204: Ok, but no body
  repositories.splice(repositoryIndex, 1); 
  
  return response.status(204).send(); 
});

// This is the only way to add one to likes property  
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params; 
  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex < 0 ) {
    return response.status(400).json({ error: "Invalid id"})
  }
  
  const { title, url, techs } = repositories[repositoryIndex];
  var { likes } = repositories[repositoryIndex];

  // Add +1 to likes 
  likes += 1; 

  repositories[repositoryIndex] = { id, title, url, techs, likes }

  return response.json(repositories[repositoryIndex]);
    
});

module.exports = app;
