const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const Recipe = require('./models/Recipe.model');

const app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());

// app.js
//...

const MONGODB_URI = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev';

mongoose
  .connect(MONGODB_URI)
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error('Error connecting to mongo', err));

// ...
// DATABASE CONNECTION

// ROUTES
//  GET  / route - This is just an example route

app.post('/recipes', (req, res) => {
  Recipe.create({
    title: req.body.title,
    level: req.body.level,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    image: req.body.image,
    duration: req.body.duration,
    creator: req.body.creator,
    instructions: req.body.instructions,
  })
    .then(createdRecipe => {
      res.status(201).json(createdRecipe);
    })
    .catch(error => {
      console.error('Error creating recipe:', error); // Log the error
      res.status(500).json({ message: 'Error while creating new recipe' });
    });
});

app.get('/recipes', (req, res) => {
  Recipe.find()
    .then(allRecipes => {
      res.status(200).json(allRecipes);
    })
    .catch(error => {
      res.status(500).json({ message: 'error while getting all recipe' });
    });
});

app.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(500).json({ message: 'error while getting all recipe' });
    });
});

app.put('/recipes/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedRecipe => {
      res.status(200).json(updatedRecipe);
    })
    .catch(error => {
      res.status(500).json({ message: 'error while updating a single recipe' });
    });
});

app.delete('/recipes/:id', (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      res.status(500).json({ message: 'error while deleting a single recipe' });
    });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
