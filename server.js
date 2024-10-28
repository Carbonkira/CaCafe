const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/home.html')));
app.get('/featured', (req, res) => res.sendFile(path.join(__dirname, 'public/featured.html')));
app.get('/products', (req, res) => res.sendFile(path.join(__dirname, 'public/products.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public/contact.html')));

// Routes for marketing mockup pages
app.get('/email-mockup', (req, res) => res.sendFile(path.join(__dirname, 'public/email-mockup.html')));
app.get('/social-mockup', (req, res) => res.sendFile(path.join(__dirname, 'public/social-mockup.html')));


// API routes
app.get('/api/products', (req, res) => res.json(products));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
