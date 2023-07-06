const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined; // agar project development holda bolsa 'source-map' qoshilib ERROR larni topishni osonlashtiradi

module.exports = {
    mode,
    target,
    devtool,

    entry: path.resolve(__dirname, 'src/index.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name].[contenthash].js', // main.js ni harbita yangilanganida yandi nome beradi
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].scss',
        }),
    ],

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },

        port: 5000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        
            {
              test: /\.s(c|sa|sc)ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
              ],
            },
        ],
    },
}; 