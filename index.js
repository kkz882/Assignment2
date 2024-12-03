const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const productRoutes = require('./routes/productRoutes');  // 引入路由

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// 设置 EJS 为视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/Marketplace') // 移除 useNewUrlParser 和 useUnifiedTopology
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// 渲染首页
app.get('/', (req, res) => {
  res.render('index');  // 渲染 index.ejs
});

// 使用产品路由
app.use('/api', productRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
