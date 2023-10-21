const path = require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const target = mode === 'development' ? 'web' : 'browserslist';
const devtool = mode === 'development' ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        hot: true,
    },
    entry: './src/index.js',
    output: {
        filename: "[name][contenthash].js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    plugins: [
        new HtmlWebapckPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name][contenthash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif|avif|webp)/i,
                type: 'assets/resource',
            },
            {
                test: /\.(woff2|woff|eot|ttf|otf)/i,
                type: 'assets/resource',
            },
        ]
    }
};