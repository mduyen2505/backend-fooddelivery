// controllers/cartController.js
const Cart = require('../models/CartModel');
const Product = require('../models/productsModel')

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
    console.log("Decoded user:", req.user); 
    try {
        const { product_id, quantity, price } = req.body;
        const user_id = req.user.id; 
        if (!user_id) {
            return res.status(401).json({ message: 'User ID not found' });
        }
        // Tìm sản phẩm bằng ID_Product
        const product = await Product.findOne({ ID_Product: product_id });
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        const cartItem = await Cart.findOne({ user_id, ID_Product: product_id });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await Cart.create({ user_id, ID_Product: product_id, quantity, price });
        }
        res.status(200).json({ message: 'Thêm vào giỏ hàng thành công' });
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ error: error.message });
    }
};


// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
    console.log("Decoded user:", req.user);
    try {
        const user_id = req.user.id; 
        if (!user_id) {
            return res.status(401).json({ message: 'User ID not found' });
        }
        const cartItems = await Cart.find({ user_id })
           

        if (!cartItems) {
            return res.status(404).json({ message: 'Giỏ hàng trống' });
        }
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart:", error.message);
        res.status(500).json({ error: 'Lỗi lấy giỏ hàng' });
    }
};



// Cập nhật sản phẩm trong giỏ hàng
exports.updateCartItem = async (req, res) => {
    try {
        const { product_id } = req.params;
        const { quantity } = req.body;
        const user_id = req.user.id; 

        if (!user_id) {
            return res.status(401).json({ message: 'User ID not found' });
        }

        if (quantity <= 0) {
            return res.status(400).json({ error: 'Số lượng phải lớn hơn 0' });
        }

        const cartItem = await Cart.findOne({ user_id: user_id, ID_Product: product_id});

        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
            res.status(200).json({ message: 'Cập nhật giỏ hàng thành công', cartItem });
        } else {
            res.status(404).json({ error: 'Sản phẩm không tồn tại trong giỏ hàng' });
        }
    } catch (error) {
        console.error("Error updating cart item:", error.message);
        res.status(500).json({ error: 'Lỗi cập nhật sản phẩm trong giỏ hàng' });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
    try {
        const { product_id } = req.params;
        const user_id = req.user.id; 

        if (!user_id) {
            return res.status(401).json({ message: 'User ID not found' });
        }

        const cartItem = await Cart.findOne({ user_id: user_id, ID_Product: product_id });
        if (!cartItem) {
            return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' });
        }

        const result = await Cart.deleteOne({ user_id: user_id, ID_Product: product_id});

        if (result.deletedCount === 0) {
            return res.status(500).json({ message: 'Không thể xóa sản phẩm khỏi giỏ hàng' });
        }

        res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
    } catch (error) {
        console.error("Error removing from cart:", error.message);
        res.status(500).json({ error: 'Lỗi xóa sản phẩm khỏi giỏ hàng' });
    }
};
