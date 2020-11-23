const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var path = require("path");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        publicPath: "/",
    },
    devServer: {
        contentBase: './src/static',
        historyApiFallback: true,
        host: '0.0.0.0'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "postcss-loader",
                    "css-loader", // translates CSS into CommonJS
                ]
            },
            {
                test: { and: [/^ee-*.scss$/, /\.scss$/] },
                exclude: [/\.global.scss$/, /node_modules/],
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader",
                    "sass-to-string",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                outputStyle: "compressed",
                            },
                        },
                    },
                ]
            },
            {
                test: /\.global.scss$/,
                exclude: [/node_modules/],
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader",
                    "less-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },

});