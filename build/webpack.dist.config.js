var path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'websdk.min': './lib/index.js'
    },
    output: {
        path: path.resolve(__dirname, '..'),
        filename: 'dist/[name].js',
        libraryTarget: 'umd',
        library: 'websdk',
    },
    node: {
        fs: 'empty',
        ws: 'empty'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ],
    },
    plugins: [
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ],
};