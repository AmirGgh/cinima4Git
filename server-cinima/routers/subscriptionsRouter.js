const express = require('express');
// const subscriptionsBLL = require('../BLL/subscriptionsBLL');
const jwt = require('jsonwebtoken')
const router = express.Router();
const axios = require('axios')

// Entry Point 'http://localhost:8000/subscriptions'
const subscriptionsURL = 'http://localhost:8080/subscriptions'

// Get All subscriptions
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

    // Check for 'View Subscriptions' permission
    if (!decoded.permissions || !decoded.permissions.includes('View Subscriptions')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'View Subscriptions' permission is present
    await axios.get(`${subscriptionsURL}`).then(response => res.status(200).send(response.data)).catch(err => console.log(err))

  });
});
// Add a subscription - accese with 'Update Subscriptions' permission
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

    // Check for 'Create Subscriptions' permission
    if (!decoded.permissions || !decoded.permissions.includes('Update Subscriptions')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Create Subscriptions' permission is present
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const result = await axios.post(`${subscriptionsURL}`, req.body).then(res => res.status(200).send(res)).catch(err => err)
    res.status(200).send(result)
  });
});

// Update a subscription
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

    // Check for 'Update Subscriptions' permission
    if (!decoded.permissions || !decoded.permissions.includes('Update Subscriptions')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Update Subscriptions' permission is present
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const result = await axios.put(`${subscriptionsURL}/${req.params.id}`, req.body, options).then(res => res.status(200).send(res)).catch(err => err)
    res.status(200).send(result)
  });
});


module.exports = router;
