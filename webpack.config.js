const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
	resolve: {
		extensions: ['.js', '...']
	},
	entry: ['./src/index.js'],
	output: {
		path: __dirname + '/dist',
		filename: "bundle.js"
	},
	devServer: {
		port: 3000,
		contentBase: __dirname + '/dist'
	},
	plugins: [
		new HTMLPlugin({
			filename: "index.html",
			template: __dirname + '/src/index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}