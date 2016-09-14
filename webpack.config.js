woshi`var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ueditorPath = path.resolve(__dirname, '../_admin/ueditor1.6.1');
module.exports = {
    //entry: {
    //    page1: path.resolve(__dirname, './src/js/index.jsx'),
    //        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
    //    page2: path.resolve(__dirname, './src/js/hello.jsx')
    //},
  devtool: 'inline-source-map' ,
  devServer: true,
  hotComponents: true,
	//entry: path.resolve(__dirname, './_admin/src/js/index.jsx'),
    entry: {
       index: [
      'webpack-dev-server/client?http://host.com:3001',//入口路径
      'webpack/hot/only-dev-server',
      './src/index.jsx'
    ]
    },

	output: {
		path: path.resolve(__dirname, './dist'),
    publicPath: 'http://host.com:3001/dist/',//热加载地址
    hash: true,
    filename: 'xSmartBundle.js',
    chunkFilename: '[id].chunk.js'
	},
	// 语言规范解释器，babel6开始插件化了
  babel: {
		presets: ['es2015', 'stage-0', 'react']
  },
	resolve: {
		extensions: ['', '.js', '.jsx']
	},

	module: {
		loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot','jsx?harmony','babel?presets[]=es2015,presets[]=react,presets[]=stage-0'],
        exclude: /node_modules/
      },{
				test: /\.js$/,
				loaders: ['react-hot','babel-loader'],
                //exclude: [nodeModulesPath, ueditorPath]
                exclude: /node_modules/,
				//,query: {presets: ['es2015','react']}
			},{
          test: /\.css$/,
          exclude: /node_modules|uncompileBase\.css/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]!postcss")
      },{
        test: /\.css$/,
        include: /node_modules|uncompileBase\.css/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss")
      },{
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.scss|sass/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
	},
    plugins: [
		new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
        //favicon:'./src/img/favicon.ico', //favicon路径
        filename: './index.html',    //生成的html存放路径，相对于 path
        template:'./assets/template/index.html',    //html模板路径
        inject:true    //允许插件修改哪些内容，包括head与body
    }),
    ]
};


