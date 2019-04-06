var webpack = require("webpack");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: __dirname + "/public",
		publicPath: "/public",
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							url: false //disable webpack background image url() handling
						}
					},
					{
						loader: "postcss-loader"
					},
					{
						loader: "sass-loader"
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			"jQuery": "jquery",
			"$": "jquery",
			"global.jQuery": "jquery"
		})
	]
};