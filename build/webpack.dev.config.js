var path = require('path');
var webpack = require('webpack')

module.exports = {
    entry: {
        "websdk": "./lib/index.js"
    },
    output: {
        path: path.resolve(__dirname, '..'),
        filename: "dist/[name].js",
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
                    presets: ['es2015', "stage-0"]
                }
            }
        ],
    }
}