const mongoose = require('mongoose');

// 定义产品 Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true }
});

// 创建产品模型
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
