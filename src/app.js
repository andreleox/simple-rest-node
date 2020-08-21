const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');
const { restart } = require("nodemon");
 
// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Create middleware function to check valid repository id
function validateRepositoryId (request, response, next){
  //TODO
  // Get id from request 
  // Check if it is uuid isuid(id), else return status(400)
  // Return next 
}


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // Get data from body  
  const { title, url, techs } = request.body;
  const likes = 0;
  
  // Set one specific repository, with a new uuid and 0 likes 
  const repository = { id: uuid(), title, url, techs, likes }
  
  // Push one element to array 
  repositories.push(repository);

  // Return a json with the brand new repository 
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // Get data from request
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  // Check if repository exists, else return error
  const repositoryIndex = repositories.findIndex( (repo) => repo.id === id ); 
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: `id not found: ${id}`})
  }
 
  // Get current likes and avoid changes
  const { likes } = repositories[repositoryIndex]; 

  // Update repository 
  repository = { id, title, url, techs, likes }

  repositories[repositoryIndex] = repository;

  // Rerturn a json with modified repository 
  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  // Get id from request and repository index 
  const { id } = request.params; 
  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  // Check if it exists, else return error 
  if (repositoryIndex < 0 ) {
    return response.status(400).json({ error: "Invalid id"})
  }

  // Delete repository and return 204
  repositories.splice(repositoryIndex, 1); 
  
  return response.status(204).send(); 
});

app.post("/repositories/:id/like", (request, response) => {
  // Get id from request and repository index 
  const { id } = request.params; 
  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  // Check if it exists, else return error 
  if (repositoryIndex < 0 ) {
    return response.status(400).json({ error: "Invalid id"})
  }
  
  const { title, url, techs } = repositories[repositoryIndex];
  var { likes } = repositories[repositoryIndex];

  // Add +1 to likes 
  likes += 1; 

  // Update repository and return json 
  repositories[repositoryIndex] = { id, title, url, techs, likes }
  return response.json(repositories[repositoryIndex]);
    
});

module.exports = app;
