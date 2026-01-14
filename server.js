const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 转发  → 用户服务
app.use(['/api/users', '/api/personas', '/api/wechat/users'], createProxyMiddleware({
    target: 'https://agent69-userservice.zeabur.internal',
    changeOrigin: true
}));


// 转发  → 文件服务
app.use(['/api/files', '/api/image'], createProxyMiddleware({
    target: 'https://file-platform.zeabur.internal',
    changeOrigin: true
}));

// 转发  → llm服务
app.use('/api/agent', createProxyMiddleware({
    target: 'https://agent69-llm-service.zeabur.internal',
    changeOrigin: true
}));



// 健康检查
app.get('/', (req, res) => {
    res.json({ message: 'API Gateway is running on Zeabur!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Gateway listening on port ${PORT}`);
});