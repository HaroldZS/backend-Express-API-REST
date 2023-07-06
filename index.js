const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3005;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi there, this is my server with express!');
});

routerApi(app);

app.use((req, res) => {
  res.status(404).send('Route not found...');
});

app.listen(port, () => {
  console.log(`Listening in port: ${port}`);
});
