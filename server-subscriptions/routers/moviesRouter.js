const express = require('express');
const moviesBLL = require('../BLL/moviesBLL');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point 'http://localhost:8000/movies'

// Get All movies
router.route('/').get(async (req, res) => {

  // Only allow access if 'View Movies' permission is present
  const movies = await moviesBLL.getAllMovies();
  res.status(200).send(movies);
  // });
});

// Get movie By ID
router.route('/:id').get(async (req, res) => {
  // Only allow access if 'View Movies' permission is present
  const { id } = req.params;
  const movie = await moviesBLL.getMovieById(id);
  res.status(200).send(movie);
});

// Add a movie
router.route('/').post(async (req, res) => {
  // Only allow access if 'Create Movies' permission is present
  const obj = req.body;
  const result = await moviesBLL.addMovie(obj);
  res.status(200).send(result);
});

// Update a movie
router.route('/:id').put(async (req, res) => {

  // Only allow access if 'Update Movie' permission is present
  const { id } = req.params;
  const obj = req.body;
  const result = await moviesBLL.updateMovie(id, obj);
  res.status(200).send(result);
});

// Update  movie subscriptions
router.route('/movSub/:id').put(async (req, res) => {
  // Only allow access if 'Update Movie' permission is present
  const { id } = req.params;
  const obj = req.body;
  const result = await moviesBLL.updateSubsWatches(id, obj);;
  res.status(200).send(result);
});

// Delete a movie
router.route('/:id').delete(async (req, res) => {
  // Only allow access if 'Delete Movies' permission is present
  const { id } = req.params;
  const result = await moviesBLL.deleteMovie(id);
  res.status(200).send(result);
});

module.exports = router;
