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

    entry: ["@babel/polyfill", path.resolve(__dirname, 'src/index.js')],

    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name].[contenthash].js', // main.js ni harbita yangilanganida yandi nome beradi
        assetModuleFilename: 'assets/[name][ext]'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },

        port: 3000,
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
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [require('postcss-preset-env')],
                        },
                    },
                },
                // Compiles Sass to CSS
                "sass-loader",
              ],
            },

            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                }
            },

            { // bu imglarni mabayd larnin kichkina qilib beradi
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: [ 
                    {
                        loader: 'image-webpack-loader',

                        options: {
                            mozjpeg: {
                              progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                              enabled: false,
                            },
                            pngquant: {
                              quality: [0.65, 0.90],
                              speed: 4
                            },
                            gifsicle: {
                              interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                              quality: 75
                            },
                        },
                    },
                ],

                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                }
            },

            {
                test: /\.(?:js|mjs|cjs)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }],
                        ],
                    },
                },
            },
        ],
    },
}; 