const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: paths.devEntry,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader','css-loader']
            },
            {
                test: /\.png$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limits: 4096
                    }
                }]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: paths.dist
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'my components',
            filename: 'index.html',
            template: paths.template
        })
    ],
    mode: 'development',
    devServer: {
        hot: true,
        inline: true
    },
    devtool: 'source-map'
}