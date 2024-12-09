const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(bodyParser.json()); // To parse JSON data

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Marketplace', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Use product routes
app.use('/api/products', productRoutes);


// 配置解析中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 配置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 数据库连接
mongoose.connect('mongodb://localhost:27017/Marketplace', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected to Marketplace'))
  .catch(err => console.error('MongoDB connection error:', err));

// 路由挂载
app.use('/', authRoutes); // 登录相关路由
app.use('/products', productRoutes); // 产品管理路由

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
