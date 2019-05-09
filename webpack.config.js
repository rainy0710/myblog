const path = require('path');
// 引入vue-loader-plugin插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // 设置打包的文件路径和输出路径
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            // 安装单文件组件的loader
            {
                test: /\.vue/,
                use: 'vue-loader'
            },

            // 安装css样式文件的Loader
            // 即使是vue文件中的样式也需要引入该loader才可以解析
            {
                test: /\.css/,
                use: ['style-loader','css-loader']
            }
        ]
    },

    plugins: [
        // Vue-loader在v15.*之后版本使用时都需要引入vue-loader-plugin的插件
        new VueLoaderPlugin()
    ],

    resolve: {
        // 设置别名
        alias: {
            //设置vue.js的别名从而可以直接引入vue模块
            "vue$": "vue/dist/vue.js"
        }
    }
}