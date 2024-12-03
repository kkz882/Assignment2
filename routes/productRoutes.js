const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  deleteAllProducts, 
  findProductsByName 
} = require('../controllers/productController');

const router = express.Router();

// 获取所有产品
router.get('/products', getAllProducts);

// 获取特定产品（根据 ID）
router.get('/products/:id', getProductById);

// 创建新产品
router.post('/products', createProduct);

// 更新产品（根据 ID）
router.put('/products/:id', updateProduct);

// 删除特定产品（根据 ID）
router.delete('/products/:id', deleteProduct);

// 删除所有产品
router.delete('/products', deleteAllProducts);

// 根据产品名称查找（模糊搜索）
router.get('/products', findProductsByName);

module.exports = router;
