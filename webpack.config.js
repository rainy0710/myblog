const path = require('path');
//vue-loader必须搭配该plugin一起使用
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname, '/src/main.js'),
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            //使用vue-loader去解析vue文件
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }
};