const express = require('express');
const userJsonBLL = require('../BLL/userJsonBLL');
const jwt = require('jsonwebtoken')
const router = express.Router();

// Entry Point 'http://localhost:8000/jsonData'

//-----------------------------------------------------------------
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
    const users = await userJsonBLL.getAllUsersJson();
    res.status(200).send(users);
  });
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get user premissions By ID -?
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

    // Check for 'CRUD Users' permission
    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'CRUD Users' permission is present
    const { id } = req.params;
    const user = await userJsonBLL.getUserByIdJson(id);
    res.status(200).send(user);
  });
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update  a user premissions
router.route('/:id').put(async (req, res) => {

  // const PRIVATE_KEY = 'somekey';
  // const token = req.headers['x-access-token'];
  // if (!token) {
  //   return res.status(401).send({ auth: false, message: 'No Token Provided' });
  // }

  // jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
  //   if (err) {
  //     return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
  //   }

  //   // Check for 'CRUD Users' permission
  //   if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
  //     return res.status(403).send({ auth: false, message: 'Access Forbidden' });
  //   }

  // Only allow access if 'CRUD Users' permission is present
  const { id } = req.params;
  const obj = req.body;
  const result = await userJsonBLL.updateUserJson(id, obj);
  res.json(result);
  // });
});
// Delete  a user data
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
    const result = await userJsonBLL.deleteUserJson(id, obj);
    res.json(result);
  });
});

module.exports = router;
