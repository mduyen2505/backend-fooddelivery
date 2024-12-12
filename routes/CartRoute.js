const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController'); 
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, cartController.addToCart);
router.get('/', authMiddleware, cartController.getCart);
router.delete('/:product_id', authMiddleware, cartController.removeFromCart);
router.put('/:product_id', authMiddleware, cartController.updateCartItem);

module.exports = router;
