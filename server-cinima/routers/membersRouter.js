const express = require('express');
// const membersBLL = require('../BLL/membersBLL');
const jwt = require('jsonwebtoken')
const axios = require('axios')


const router = express.Router();

// Entry Point 'http://localhost:8080/members'
const membersURL = 'http://localhost:8080/members'

const PRIVATE_KEY = 'somekey';

// Middleware for authenticating the token and checking for 'CRUD Users' permission
const authenticate = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Failed To authenticate' });
    }

    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).json({ auth: false, message: 'Access Forbidden' });
    }
    next();
  });
};

const options = {
  headers: {
    'Content-Type': 'application/json'
  }
};


// Get member by user id
router.get('/user/:id', authenticate, async (req, res) => {
  return await axios.get(`${membersURL}/user/${req.params.id}`).then(response => res.status(200).send(response.data)).catch(error => console.log(error));
});
// Get All members
router.get('/', async (req, res) => {
  return await axios.get(`${membersURL}`).then(response => res.status(200).send(response.data)).catch(error => console.log(error));
});

// Add a member
router.post('/', authenticate, async (req, res) => {
  const result = await axios.post(`${membersURL}`, req.body, options)
  res.json(result);
}
);


// Update a member
router.put('/:id', authenticate, async (req, res) => {
  const result = await axios.put(`${membersURL}/${req.params.id}`, req.body, options).then(res => res.status(200).send(res)).catch(err => err)
  res.status(200).send(result)
});


// Delete a member
router.delete('/:id', authenticate, async (req, res) => {
  const result = await axios.delete(`${membersURL}/${req.params.id}`).then(res => res.status(200).send(res)).catch(err => err)
  res.status(200).send(result)
});

module.exports = router;
