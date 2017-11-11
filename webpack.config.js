const webpack = require("webpack");
const path = require("path");

module.exports={
	entry:'./base.js',
	output:{
		path:path.resolve(__dirname, 'quaro'),
		filename:'quaro.js',
	},
	module:{
		rules:[
			  {test: /\.vue$/,use:"vue-loader"},
			  {test: /\.css$/,use:['style-loader','css-loader']},
			  {test: /\.(png|jpg|gif)$/,use: 'url-loader'},
		],
	},
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	}
	
}






















