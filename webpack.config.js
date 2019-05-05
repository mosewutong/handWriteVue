let path = require('path');
let webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
    output: {
        path: path.resolve(__dirname, './dist'), // 项目的打包文件路径   __dirname当前文件的绝对路径
        publicPath: '/dist/', // 通过devServer访问路径
        filename: 'build.js' // 打包后的文件名
    },
    //启动一个web服务器
    devServer: {
        historyApiFallback: true,   //遇到404重定向到index.html
        overlay: true,    //将错误显示在html之上
        host:"0.0.0.0",
        port:"7000",
        hot:true,   //热刷新
        inline: true,   //内联模式
        noInfo: false,   //只保留错误警告
    },

    plugins:[
        // new UglifyJsPlugin()  //代码压缩
    ]
};