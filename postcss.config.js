module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 2 versions']
        }),
        require('postcss-svg')({
            paths: ['./src/i/icons'],
            svgo: true
        })
    ]
};
