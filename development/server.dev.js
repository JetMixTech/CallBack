const { join } = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.dev');

const port = 8080;

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true,
        assets: false,
        timings: true,
        chunks: false,
        version: false
    }
}));

app.get('*', (request, response) => {
    response.sendFile(join(__dirname, '../src/index.dev.html'));
});

app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Server is running and listening on http://localhost:${port}`);
});
