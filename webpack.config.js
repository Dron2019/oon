/* eslint-disable indent */
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        // index: "./src/assets/scripts/index-app.js",
        adminPanel: './src/assets/scripts/admin-panel/index.jsx',
    },
    output: {
        filename: '[name].bundle.js',
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    // },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
        }),
    ],
    module: {
        rules: [{
                test: /\.js$|.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
};

module.exports = config;
