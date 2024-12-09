const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    const { username } = req.body;
    try {
        console.log('Attempting login with username:', username);

        // 查找用户
        let user = await User.findOne({ username });

        // 如果没有找到用户，创建新用户
        if (!user) {
            console.log(`User with username ${username} not found, creating new user.`);
            user = new User({ username, password: '' }); // 设置密码为空字符串
            await user.save(); // 保存新用户
            console.log('New user created:', user);
        }

        // 生成 JWT 令牌
        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

        // 存储 JWT 在 cookies 中
        res.cookie('token', token, { httpOnly: true });
        console.log(`User ${username} logged in successfully`);

        // 登录成功，重定向到产品页面
        res.redirect('/products');
    } catch (error) {
        console.error('Login failed:', error);  // 打印错误信息
        res.status(500).send(`Login failed: ${error.message}`); // 将详细错误信息返回给客户端
    }
};

module.exports = { login };

