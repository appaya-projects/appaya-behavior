const	webpack = require('webpack'),
		path = require('path');

module.exports = {
	devtool: '#inline-source-map',
	entry: {
		'main': './index.ts'
	},
	mode: 'development',
	output: {
		path: path.resolve(__dirname, '..') + '/build',
		publicPath: '/',
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{ test: /\.ts?$/, use: "awesome-typescript-loader" },
			{
				test: /\.css$/, use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } }
				]
			},
			{
				test: /\.scss$/, use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, minimize: true } },
					{ loader: 'sass-loader', options: { sourceMap: true, importLoaders: 1 } }]
			}
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		})
	]
}