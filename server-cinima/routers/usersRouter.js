const express = require('express');
const usersBLL = require('../BLL/usersBLL');
const jwt = require('jsonwebtoken');
const router = express.Router();

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

// Get All users 
router.get('/', async (req, res) => {
  const users = await usersBLL.getAllUsers();
  res.status(200).json(users);
});

// Get user By ID 
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const user = await usersBLL.getUserById(id);
  res.status(200).json(user);
});

// Add a user
router.post('/', authenticate, async (req, res) => {
  const obj = req.body;
  const result = await usersBLL.addUser(obj);
  res.status(200).json(result);

});

// Update a user -admin can update everything
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  const result = await usersBLL.updateUser(id, obj);
  res.json(result);
});

router.put('/uptmem/:id', authenticate, async (req, res) => {
  const update = req.headers['update']
  if (update) {
    const { id } = req.params;
    const obj = req.body;
    const result = await usersBLL.updateUser(id, obj);
    res.json(result);
  }
});

// Create a user account
router.post('/username/:username', async (req, res) => {
  const result = await usersBLL.createAccount(req.body);
  res.status(200).json({ data: result });
});

// Delete a user
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const result = await usersBLL.deleteUser(id);
  res.status(200).json(result);
});

module.exports = router;
