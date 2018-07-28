const MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  	autoprefixer = require('autoprefixer');

module.exports = {
	devtool: '#source-map',
	entry: {
		'appaya-behavior': './index.ts',
		'behaviors-list': './list/index.ts',
		'behaviors-list-basic': './list/basic.ts'
	},
	output: {
		path: __dirname + '/dist/es5',
		publicPath: '/',
		filename: '[name].js',
	},
	optimization: {
		minimize: true
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{ test: /\.ts?$/, use: "awesome-typescript-loader" },
			{
				test: /\.css$/, use: [
				  MiniCssExtractPlugin.loader,
				  { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
				  { loader: 'postcss-loader', options: { sourceMap: true, plugins: (loader) => [autoprefixer()] } }]
			  },
			  {
				test: /\.scss$/, use: [
				  MiniCssExtractPlugin.loader,
				  { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, minimize: true } },
				  { loader: 'postcss-loader', options: { sourceMap: true, plugins: (loader) => [autoprefixer()] } },
				  { loader: 'sass-loader', options: { sourceMap: true, importLoaders: 1 } }]
			  }
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	]
}