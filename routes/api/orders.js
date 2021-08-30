const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const orders = require('../../Orders');

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Create order
router.post('/', (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).json({ msg: 'Please include valid products' });
  }

  let order = [...req.body];

  // add total to each item
  order.forEach((item) => {
    item.total = item.price * item.quantity;
  });

  // get total price for all items in order
  const totalPrice = req.body.reduce((n, { total }) => n + total, 0);

  // build new order object
  const newOrder = { order: order, total: totalPrice };

  orders.push(newOrder);
  res.json(orders);
});

module.exports = router;
