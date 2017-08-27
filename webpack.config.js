var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        // serverClient: 'webpack-dev-server/client?http://localhost:8098/',
        devServer: 'webpack/hot/dev-server',
        index: path.resolve(__dirname, './src/index.jsx')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    module: {
        //告知 webpack 每一种文件都需要使用什么加载器来处理
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: [
                        //按需加载组件
                    ]
                } 
            },            
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" 
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader" 
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcss: [require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin(
            {
                host: 'localhost/',
                port: 3030,
                proxy: 'http://localhost:8098/'
            },
            {
                reload: false
            }
        )
        , new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8098, 
        inline: true,
        contentBase: './build',
        hot: true,
        hotOnly: true,
        stats: { colors: true }
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', 'css', '.scss'],
        modules: [
            "node_modules",
            path.join(__dirname, '../node_modules'),
            path.resolve(__dirname, './components')
        ],
    }
}