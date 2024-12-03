const Product = require('../models/Product');

// 1. 获取所有产品
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. 获取特定产品（根据 ID）
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. 创建新产品
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    const newProduct = new Product({ name, description, price, quantity, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. 更新产品（根据 ID）
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5. 删除特定产品（根据 ID）
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6. 删除所有产品
exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).json({ message: 'All products deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 7. 根据产品名称查找（模糊搜索）
exports.findProductsByName = async (req, res) => {
  const { name } = req.query;
  try {
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
