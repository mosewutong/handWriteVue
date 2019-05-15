let path = require('path');
let webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin  = require("html-webpack-plugin");  // 曹组 html

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");  // 抽离样式 css文件

//主机和端口
let host = '0.0.0.0';
let port = '7000';

module.exports = {
    entry: ['./src/main.js'], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
    output: {
        path: path.resolve(__dirname, './dist'), // 项目的打包文件路径   __dirname当前文件的绝对路径
        publicPath: './', // 通过devServer访问路径
        filename: 'app.[hash:8].js' // 打包后的文件名
    },
    devtool:"source-map",
    //启动一个web服务器
    devServer: {
        contentBase:path.join(__dirname,"dist"),  // 服务器目录   
        publicPath:"/",
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
                test:/\.(css|less)$/,
                // use:[
                //     "style-loader","css-loader","less-loader"
                // ]
                use:ExtractTextWebpackPlugin.extract({
                    fallback:"style-loader" ,    //  转成 node 风格代码
                    use:[
                        "css-loader","less-loader"
                    ]
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,       //exclude表示忽略node_modules文件夹下的文件，不用转码
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    loaders: [
                        {"less":"style-loader!css-loader!less-loader"},
					    {"css":"stlye-loader!css-loader"}
                    ]
                }
            }
            
        ]
    },
    optimization:{

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
        }),

        //引入vue-loader报错的解决方案
        new VueLoaderPlugin(),
        
        //抽离css样式
        new ExtractTextWebpackPlugin({
            filename:"app.[hash:8].css",
            allChunks:true,
            disable:false
        }),
    ]
};



// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map';
//     // module.exports.plugins = (module.exports.plugins || []).concat([
//     //     new webpack.DefinePlugin({
//     //         'process.env': {
//     //             NODE_ENV: '"production"'
//     //         }
//     //     }),
//     //     new webpack.optimize.UglifyJsPlugin(),
//     // ])
//     // optimization: {
//     //     minimizer: [new UglifyJsPlugin()],
//     // },
//     // module.exports.optimization.minimizer = [new UglifyJsPlugin()];
// }