const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "production",
    entry: {
        app: ['./tests/dev/app.js', './index.css']
    },
    output: {
        path: path.resolve(__dirname, './tests'),
        filename: '[name].js',
        crossOriginLoading: 'anonymous'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: '/@extract/i'
            }),
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.ids.HashedModuleIdsPlugin(),
        new SubresourceIntegrityPlugin({
            hashFuncNames: ['sha256', 'sha384'],
            enabled: true
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            integrity: true,
            prettyPrint: true,
            path: path.resolve(__dirname, '.')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};