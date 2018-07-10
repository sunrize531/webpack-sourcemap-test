const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
	'lodash', 'jquery', 'd3', 'async', 'browserify',
	'bootstrap', 'eonasdan-bootstrap-datetimepicker', 'moment', 'numeral',
	'nunjucks', 'semver', 'superagent'
];

const VENDOR_LIBS_RE = [];
for (let mod of VENDOR_LIBS) {
	VENDOR_LIBS_RE.push(new RegExp(`node_modules[\\/]${mod}`));
}

module.exports = {
	target: 'web',
	mode: 'development',
	entry: {
		main: ['babel-polyfill', './app.js']
	},
	output: {
		filename: "[name].js?[hash]",
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['env', {targets: {browsers: ["> 5%"]}, useBuiltIns: true}]],
						sourceMap: true
					}
				}
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: function (module) {
						for (let t of VENDOR_LIBS) {
							if (/node_modules[\\/]/.test(module.context) && module.context.search(t) > -1) {
								return true;
							}
						}
						return false;
					},
					name: "vendor",
					chunks: "all"
				}
			}
		}
	},
	plugins: [
		// new UglifyJSPlugin({exclude: ['vendor.js'], cache: true, sourceMap: true}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			cache: false
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: 'sourcemaps/[name].js.map',
			exclude: ['vendor.js']
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			'window.jQuery': 'jquery',
			'window.$': 'jquery',
			bootstrap: "bootstrap"
		})
	],
	devServer: {
		// hot: true,
		host: "0.0.0.0",
		port: 23028,
		disableHostCheck: true,
		contentBase: path.resolve(__dirname, 'dist-webpack'),
		publicPath: '/'
	}
};