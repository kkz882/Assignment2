const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

// 登录页面显示
router.get('/', (req, res) => {
    res.render('login'); // 渲染登录页面
});

// 处理登录请求
router.post('/login', login);

module.exports = router;
