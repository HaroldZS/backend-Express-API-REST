const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hi there, this is my server with express!');
});

app.get('/new-route', (req, res) => {
  res.send('New route');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }

  res.json(products);
});

app.get('/products/filter', (req, res) => {
  res.send('Filter');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 1000,
  });
});

app.get('/products/filter', (req, res) => {
  res.send('Filter');
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({ limit, offset });
  } else {
    res.send('There are not parameters');
  }
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: 'Product 1',
    price: 1000,
  });
});

app.listen(port, () => {
  console.log(`Listening in port: ${port}`);
});
