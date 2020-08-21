//引入Node.js中一个内置的模块path，专门用于解决路径解析问题
const {
	resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['./src/js/index.js', './src/index.html'], //入口配置
	output: {
		path: resolve(__dirname, '../dist'), //配置输出目录
		filename: './js/index.js' //输出文件的名字
	},
	mode: 'development',
	//配置各种loader
	module: {
		rules: [
			//配置less的解析
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"]
			},
			//配置解析html的loader
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	devServer: {
		port: 5000,
		hot: true //热模替换开启
	}
};