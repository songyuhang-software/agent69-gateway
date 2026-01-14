const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 转发  → 用户服务
app.use('/user-service', createProxyMiddleware({
    target: 'http://agent69-userservice.zeabur.internal:8080',
    changeOrigin: true
}));


// 转发  → 文件服务
app.use('/file-platform', createProxyMiddleware({
    target: 'http://file-platform.zeabur.internal:8080',
    changeOrigin: true
}));

// 转发  → llm服务
app.use('/llm-service', createProxyMiddleware({
    target: 'http://agent69-llm-service.zeabur.internal:8000',
    changeOrigin: true
}));



// 健康检查
app.get('/', (req, res) => {
    res.json({ message: 'API Gateway is running on Zeabur!' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Gateway listening on port ${PORT}`);
});