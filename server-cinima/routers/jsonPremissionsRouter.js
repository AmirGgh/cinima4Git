const express = require('express');
const jsonUsersBLL = require('../BLL/premissionsJsonBLL');
const jwt = require('jsonwebtoken')
const router = express.Router();

// Entry Point 'http://localhost:8000/jsonPremi'

// const admin

//--------------------------------------------------------------------------------
// Get All jsonUsers premissions
router.get('/', async (req, res) => {
  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'CRUD Users' permission
    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'CRUD Users' permission is present
    const users = await jsonUsersBLL.getAllPremissJson();
    res.status(200).send(users);
  });
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Get user premissions By ID - anyone that have token can get permissions by id
router.route('/:id').get(async (req, res) => {

  // that router should give data befor token will create
  const { id } = req.params;
  const user = await jsonUsersBLL.getPremissByIdJson(id);
  res.status(200).send(user);
  // });
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Update (add/delete a premission) a user premissions
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

    // Check for 'CRUD Users' permission
    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'CRUD Users' permission is present
    const { id } = req.params;
    const obj = req.body;
    const result = await jsonUsersBLL.updatePremissJson(id, obj);
    res.json(result);
  })
});

// Delete user premissions
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

    // Check for 'CRUD Users' permission
    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'CRUD Users' permission is present
    const { id } = req.params;
    const obj = req.body;
    const result = await jsonUsersBLL.deleteUserJson(id, obj);
    res.json(result);
  });
});

module.exports = router;
