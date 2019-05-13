let path = require('path');
let webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin  = require("html-webpack-plugin");  // 曹组 html

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

//主机和端口
let host = '0.0.0.0';
let port = '7000';

module.exports = {
    entry: ['babel-polyfill','./src/main.js'], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
    output: {
        path: path.resolve(__dirname, './dist'), // 项目的打包文件路径   __dirname当前文件的绝对路径
        publicPath: '/dist/', // 通过devServer访问路径
        filename: 'build.js' // 打包后的文件名
    },
    //启动一个web服务器
    devServer: {
        historyApiFallback: true,   //遇到404重定向到index.html
        overlay: true,    //将错误显示在html之上
        host:host,
        port:port,
        hot:true,   //热刷新
        inline: true,   //内联模式
        noInfo: true,   //只保留错误警告
        //前端跨域代理解决
        proxy: {
            '/index': {
                target: 'http://localhost:8000',
                secure: false
            }
        }

    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'style':"./src/style",
            '@':"./src"
        }
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    "style-loader","css-loader","less-loader"
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,       //exclude表示忽略node_modules文件夹下的文件，不用转码
            }
        ]
    },

    plugins:[
        //代码注入插件
        // new UglifyJsPlugin(),  //代码压缩
        new HtmlWebpackPlugin({
            filename:'./index.html',
            template:'./index.html',
            inject:true,         // 自动注入   js/css
            minify:{
                collapseWhitespace:true //折叠空白区域 也就是压缩代码
            },
        }),
        
        //输出控制台插件
        new FriendlyErrorsWebpackPlugin({
            //是否每次编译之间清除控制台
            //默认为true
            clearConsole:true,
            // 运行成功
            compilationSuccessInfo:{
                messages:[`Your application is running here: http://${host}:${port}`],
                // notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            //添加格式化程序和变换器（见下文）
            additionalFormatters: [],
            additionalTransformers: []
        })
    ]
};