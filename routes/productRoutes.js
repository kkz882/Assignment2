const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // 引入产品模型

// 显示 products 页面
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // 查询所有产品
        res.render('products', { products }); // 渲染 products 页面并传递产品数据
    } catch (error) {
        res.status(500).send('Error loading products page');
    }
});

// 添加新产品
router.post('/add', async (req, res) => {
    const { name, price, quantity, category } = req.body;
    try {
        const newProduct = new Product({ name, price, quantity, category });
        await newProduct.save();
        res.redirect('/products'); // 添加成功后重定向到 products 页面
    } catch (error) {
        res.status(500).send('Failed to add product');
    }
});

// 删除产品
router.get('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products'); // 删除成功后重定向到 products 页面
    } catch (error) {
        res.status(500).send('Failed to delete product');
    }
});

module.exports = router;
