const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 转发  → 用户服务
app.use(['/api/users', '/api/personas', '/api/wechat/users'], createProxyMiddleware({
    target: 'http://agent69-userservice.zeabur.internal',
    changeOrigin: true,
    pathRewrite: {
        '^/api/users': '/api/users', // 保持原始路径
        '^/api/personas': '/api/personas',
        '^/api/wechat/users': '/api/wechat/users'
    }
}));


// 转发  → 文件服务
app.use(['/api/files', '/api/image'], createProxyMiddleware({
    target: 'https://file-platform.zeabur.internal',
    changeOrigin: true,
    pathRewrite: {
        '^/api/files': '/api/files', // 保持原始路径
        '^/api/image': '/api/image'
    }
}));

// 转发  → llm服务
app.use('/api/agent', createProxyMiddleware({
    target: 'http://agent69-llm-service.zeabur.internal:8000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/agent': '/api/agent' // 保持原始路径
    }
}));



// 健康检查
app.get('/', (req, res) => {
    res.json({ message: 'API Gateway is running on Zeabur!' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Gateway listening on port ${PORT}`);
});