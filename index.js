const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const cors = require('cors');

const app = express();

// Init Middleware
app.use(logger);

app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Product API routes
app.use('/api/products', require('./routes/api/products'));

// Product API routes
app.use('/api/orders', require('./routes/api/orders'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
