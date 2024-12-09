const Product = require('../models/Product');

// 获取所有产品
const getAllProducts = async (req, res) => {
    try {
        const searchQuery = req.query.name || ''; // 查询参数
        const products = await Product.find({
            name: { $regex: searchQuery, $options: 'i' }, // 模糊搜索
        });
        res.render('products', { products });
    } catch (error) {
        res.status(500).send(`Failed to fetch products: ${error.message}`);
    }
};

// 添加新产品
const addProduct = async (req, res) => {
    try {
        const { name, price, quantity, category } = req.body;
        await Product.create({ name, price, quantity, category });
        res.redirect('/products');
    } catch (error) {
        res.status(500).send(`Failed to add product: ${error.message}`);
    }
};

// 更新产品信息
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity, category } = req.body;
        await Product.findByIdAndUpdate(id, { name, price, quantity, category });
        res.redirect('/products');
    } catch (error) {
        res.status(500).send(`Failed to update product: ${error.message}`);
    }
};

// 删除单个产品
const deleteProductById = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        res.status(500).send(`Failed to delete product: ${error.message}`);
    }
};

// 删除所有产品
const deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.redirect('/products');
    } catch (error) {
        res.status(500).send(`Failed to delete all products: ${error.message}`);
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProductById,
    deleteAllProducts,
};
