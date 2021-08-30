const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const products = require('../../Products');

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get single product
router.get('/:id', (req, res) => {
  const found = products.some(
    (product) => product.id === parseInt(req.params.id)
  );

  if (found) {
    res.json(
      products.filter((product) => product.id === parseInt(req.params.id))
    );
  } else {
    res.status(400).json({ msg: `Product not found with id ${req.params.id}` });
  }
});

// Create product
router.post('/', (req, res) => {
  const newProduct = {
    id: uuid.v4(),
    name: req.body.name,
    price: req.body.price,
  };

  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ msg: 'Please include both name and price' });
  }

  products.push(newProduct);
  res.json(products);
});

module.exports = router;
