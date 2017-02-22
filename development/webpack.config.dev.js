const { join } = require('path');
const { NoEmitOnErrorsPlugin, DefinePlugin, LoaderOptionsPlugin } = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: join(__dirname, '../src/js/index.js'),
    output: {
        filename: 'callback.js',
        path: join(__dirname, '../build')
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.sass'],
        modules: [
            join(__dirname, '../src'),
            join(__dirname, '../node_modules')
        ]
    },
    plugins: [
        new NoEmitOnErrorsPlugin(),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};
