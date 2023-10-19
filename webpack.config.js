const path = require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode,
    devtool: 'source-map',
    devServer: {
        hot: true,
    },
    entry: './src/index.js',
    output: {
        filename: "[name][contenthash].js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebapckPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                //29-19
            },
        ]
    }
};