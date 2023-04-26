const express = require('express');
const axios = require('axios')
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point
const moviesURL = 'http://localhost:8080/movies'

// Get All movies
router.route('/').get(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'View Movies' permission
    if (!decoded.permissions || !decoded.permissions.includes('View Movies')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'View Movies' permission is present
    await axios.get(`${moviesURL}`).then(response => res.status(200).send(response.data)).catch(error => console.log(error));
  });
});

// Get movie By ID
router.route('/:id').get(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'View Movies' permission
    if (!decoded.permissions || !decoded.permissions.includes('View Movies')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'View Movies' permission is present
    const { id } = req.params;
    const movie = await moviesBLL.getMovieById(id);
    res.status(200).send(movie);
  });
});

// Add a movie
router.route('/').post(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }
    // Check for 'Create Movies' permission
    if (!decoded.permissions || !decoded.permissions.includes('Create Movies')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Create Movies' permission is present
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const result = await axios.post(`${moviesURL}`, req.body, options).then(res => res.status(200).send(res)).catch(err => err)
    res.status(200).send(result)
  });
});

// Update a movie
router.route('/:id').put(async (req, res) => {
  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'Update Movie' permission
    if (!decoded.permissions || !decoded.permissions.includes('Update Movies')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Update Movie' permission is present
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const result = await axios.put(`${moviesURL}/${req.params.id}`, req.body, options).then(res => res.status(200).send(res)).catch(err => err)
    res.status(200).send(result)
  });
});

// Update  movie subscriptions
router.route('/movSub/:id').put(async (req, res) => {
  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'Update Movie' permission
    if (!decoded.permissions || !decoded.permissions.includes('Update Movies')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Update Movie' permission is present
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const result = await axios.put(`${moviesURL}/movSub/${req.params.id}`, req.body, options).then(result => res.status(200).send(result)).catch(err => err)
    res.status(200).send(result)
  });
});

// // Delete a movie
router.route('/:id').delete(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'Delete Movies' permission
    if (!decoded.permissions || !decoded.permissions.includes('Delete Movies')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Delete Movies' permission is present
    const result = await axios.delete(`${moviesURL}/${req.params.id}`).then(res => res.status(200).send(res)).catch(err => err)
    res.status(200).send(result)
  });
});

module.exports = router;
