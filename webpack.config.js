console.log(' process.env.NODE_ENV: ', process.env.NODE_ENV);
module.exports = {
    devtool: 'source-map',
    devServer: {
        hot: true,
    },
    entry: './src/index.js',
    output: {
        filename: "index.js"
    },
    
}