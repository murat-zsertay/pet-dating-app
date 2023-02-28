import {createProxyMiddleware} from 'http-proxy-middleware';

export const setupProxy = app => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.PROXY_URL,
            changeOrigin: true,
        })
    );
};
