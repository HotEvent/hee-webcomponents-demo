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
        static: './src/static',
        historyApiFallback: true,
        // host:'0.0.0.0',
        port:'8081'
    },
    // optimization:{
    //     chunkIds:"named"
    // },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "postcss-loader",
                    "css-loader", // translates CSS into CommonJS
                ]
            },
            {
                test: { and: [/\.scss$/, /ee-/] },
                exclude: [/styles/],
                use: [

                    "sass-to-string",
                    "postcss-loader",
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
                test: { and: [/\.scss$/, /global/] },
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
                    {
                        loader: "less-loader",
                        options: {
                            // modifyVars: antdVar,
                            javascriptEnabled: true,
                        },
                    }
                ]
            }
        ]
    },
    
});