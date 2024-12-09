const express = require('express');
const router = express.Router();

// 显示登录页面
router.get('/', (req, res) => {
    res.render('login'); // 渲染 login.ejs 页面
});

// 处理登录表单提交
router.post('/login', (req, res) => {
    const { username } = req.body;
    if (username) {
        // 登录成功后跳转到 /products 页面
        res.redirect('/products');
    } else {
        // 如果没有输入用户名，则返回错误
        res.status(400).send('Username is required');
    }
});

module.exports = router;
