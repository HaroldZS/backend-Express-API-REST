const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3005;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Permission denied'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hi there, this is my server with express!');
});

routerApi(app);

app.use((req, res) => {
  res.status(404).send('Route not found...');
});

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening in port: ${port}`);
});
