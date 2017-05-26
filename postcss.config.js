'use strict'

const path = require('path');

module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 2 versions']
        }),
        require('postcss-inline-svg')({
            path: path.join(__dirname, 'src/i/icons')
        })
    ]
};
