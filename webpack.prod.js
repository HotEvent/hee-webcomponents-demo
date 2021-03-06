const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CssMinimizerPlugin  = require("css-minimizer-webpack-plugin");
module.exports = merge(common, {
    mode: 'production',
    // devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: "/",
    },
    // stats: {
    //     // Examine all modules
    //     maxModules: Infinity,
    //     // Display bailout reasons
    //     optimizationBailout: true
    // },
    module: {
        rules: [
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
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader"
                ]
            },
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            // cacheGroups: {
            //     commons: {
            //         test: /[\\/]node_modules[\\/]/,
            //         name: 'vendors',
            //         chunks: 'all'
            //     }
            // }
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/static' }
            ]
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        new CleanWebpackPlugin(['dist'])
    ]
});