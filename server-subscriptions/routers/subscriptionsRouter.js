const express = require('express');
const subscriptionsBLL = require('../BLL/subscriptionsBLL');
const jwt = require('jsonwebtoken')
const router = express.Router();

// Entry Point 'http://localhost:8000/subscriptions'

// Get All subscriptions
router.route('/').get(async (req, res) => {
  // Only allow access if 'View Subscriptions' permission is present
  const subscriptions = await subscriptionsBLL.getAllSubscriptions();
  res.status(200).send(subscriptions);
  // });
});

// Add a subscription - accese with 'Update Subscriptions' permission
router.route('/').post(async (req, res) => {
  // Only allow access if 'Create Subscriptions' permission is present
  const obj = req.body;
  const result = await subscriptionsBLL.addSubscription(obj);
  res.status(200).send(result);
});

// Update a subscription
router.route('/:id').put(async (req, res) => {
  // Only allow access if 'Update Subscriptions' permission is present
  const { id } = req.params;
  const obj = req.body;
  const result = await subscriptionsBLL.updateSubscription(id, obj);
  res.status(200).send(result);
});


module.exports = router;
