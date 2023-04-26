const express = require('express');
const membersBLL = require('../BLL/membersBLL');
const jwt = require('jsonwebtoken')


const router = express.Router();

// Entry Point 'http://localhost:8080/members'
const PRIVATE_KEY = 'somekey';


// Get All members
router.route('/').get(async (req, res) => {
  const members = await membersBLL.getAllMembers();
  res.json(members);
});


// Get member by user id
router.route('/user/:id').get(async (req, res) => {
  const members = await membersBLL.getMemberByUserId(req.params.id);
  res.json(members);
});

// Add a member
router.post('/', async (req, res) => {
  const result = await membersBLL.addMember(req.body);
  // res.status(200).json(result);
  return
});

// Update a member
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  const result = await membersBLL.updateMember(id, obj);
  res.json(result);
});
// Update a firstmembers
router.put('/first/:name', async (req, res) => {
  const { name } = req.params;
  const obj = req.body;
  const result = await membersBLL.updateMemberByname(name, obj);
  res.json(result);
});

// Delete a member
router.delete('/:id', async (req, res) => {
  const result = await membersBLL.deleteMember(req.params.id);
  res.json(result);
});


module.exports = router;
