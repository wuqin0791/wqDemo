

/*
 * @Description: This is a webpack config file
 * @Author: JeanneWu
 * @Date: 2020-03-17 11:28:09
 */
// js文件头部注释之后的内容
const path = require('path')
const moduleConfig = env => {
    // Use env.<YOUR VARIABLE> here:
    console.log('NODE_ENV: ', env.NODE_ENV) // 'production' 根据此处判断环境
    console.log('Production: ', env.production) // ture
    return {
        entry: "./src/main.js",
        output: {
            filename: 'main.js',
            path: path.resolve('__dirname', 'dist')
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }]
        }
    }
}

module.exports = env => {
    return moduleConfig(env)
}