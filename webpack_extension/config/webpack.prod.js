//引入Node.js中一个内置的模块path，专门用于解决路径解析问题
const {
	resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: {
		index: './src/js/index.js',
		module1: './src/js/module1.js',
	}, //入口配置
	output: {
		path: resolve(__dirname, '../dist'), //配置输出目录
		filename: './js/[name].[hash:5].js' //输出文件的名字
	},
	mode: 'production',
	//配置各种loader
	module: {
		rules: [
			//配置less的解析
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new WorkboxWebpackPlugin.GenerateSW({
			clientsClaim: true, //删除旧的 serviceworker生成一个 serviceworker 配置文件~
			skipWaiting: true //帮助serviceworker快速启动
		})
	],
	/*
	   1. 可以将第三方库单独打包
	   2. 会自动分析各文件中均用到的第三方包。
	 */
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	externals: {
		jquery: 'jQuery'
	}
};