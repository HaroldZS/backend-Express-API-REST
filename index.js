const express = require('express');
const app = express();
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hi there, this is my server with express!');
});

app.get('/new-route', (req, res) => {
  res.send('New route');
});

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000,
    },
    {
      name: 'Product 2',
      price: 2000,
    },
  ]);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 1000,
  });
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
