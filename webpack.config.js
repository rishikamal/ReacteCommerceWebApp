var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/js/');

var config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
		},
	devServer: {
	contentBase: "./",
	historyApiFallback: true,
		},

	resolve: {
   		modules: ['node_modules'],
   		extensions: ['.js', '.jsx'],
   		// alias: {
	    //   	"jquery-ui": "jquery-ui/jquery-ui.js",
	    //   	modules : path.resolve(__dirname, 'node_modules/jquery-ui/ui')
     //  	}  
     },
	
	module : {
		loaders : [
			{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	},

	plugins: [
	    new webpack.ProvidePlugin({
	      "$":"jquery",
	      "jQuery":"jquery",
	      "window.jQuery":"jquery",
	      "window.$": "jquery"
	    })
    ]
};

module.exports = config;