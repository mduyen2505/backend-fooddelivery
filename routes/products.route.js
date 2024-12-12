// routes/products.route.js
const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');
// const authMiddleware = require('../middlewares/authMiddleware')

router.get('/type/:type', ProductsController.getProductsByType);

router.post('/', ProductsController.createProduct);
router.get('/', ProductsController.getAllProducts);
router.get('/:id',  ProductsController.getProductById);
router.put('/:id', ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);


module.exports = router;
