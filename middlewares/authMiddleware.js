const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.token; // 获取 cookies 中的 token
    if (!token) {
        console.log('No token found, redirecting to login');
        return res.redirect('/'); // 没有 token，重定向到登录页面
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.userId = decoded.userId;
        next(); // 继续处理请求
    } catch (error) {
        console.log('Invalid token, redirecting to login');
        return res.redirect('/'); // 无效的 token，重定向到登录页面
    }
};

module.exports = { authenticate };
