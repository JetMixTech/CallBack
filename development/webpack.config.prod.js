const { join } = require('path');
const { NoEmitOnErrorsPlugin, DefinePlugin, LoaderOptionsPlugin, optimize } = require('webpack');

const { UglifyJsPlugin } = optimize;

module.exports = {
    entry: join(__dirname, '../src/js/index.js'),
    output: {
        filename: 'js/bundle.min.js',
        path: join(__dirname, '../build'),
        publicPath: 'https://cdn.jetmix.su/callback'
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]',
                    'csso-loader',
                    'resolve-url-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=/i/[hash].[ext]'
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
        new NoEmitOnErrorsPlugin(),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new UglifyJsPlugin({
            beautify: false,
            comments: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    ]
};
