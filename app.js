const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // 引入产品路由

const app = express();

// 设置 EJS 作为模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // 设置视图文件夹路径

// 配置中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 配置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/Marketplace', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected to Marketplace'))
  .catch(err => console.error('MongoDB connection error:', err));

// 路由挂载
app.use('/', authRoutes); // 登录路由
app.use('/products', productRoutes); // 产品管理路由

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
