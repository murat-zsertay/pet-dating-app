import {createProxyMiddleware} from 'http-proxy-middleware';

export default (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.PROXY_URL,
            changeOrigin: true,
        })
    );
};
