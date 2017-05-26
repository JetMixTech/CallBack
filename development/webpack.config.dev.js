const { join } = require('path');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, DefinePlugin, LoaderOptionsPlugin } = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client',
        join(__dirname, '../src/js/index.js')
    ],
    output: {
        filename: 'bundle.js',
        path: join(__dirname, '../build')
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
                    'resolve-url-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=[name].[ext]'
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
        ],
        alias: {
            i: join(__dirname, '../src/i')
        }
    },
    plugins: [
        new HotModuleReplacementPlugin(),
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
