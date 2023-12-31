const express = require('express');
const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const productService = new ProductService();

router.get('/', async (req, res) => {
  const products = await productService.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await productService.create(body);
    res.status(201).json(newProduct);
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productService.partialUpdate(id, body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await productService.update(id, body);
  res.status(200).json(product);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await productService.delete(id);
  res.json(rta);
});

module.exports = router;
