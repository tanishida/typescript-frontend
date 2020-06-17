const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: "./src/index.tsx",
    output: {
      filename: 'bundle.js',
      path: path.resolve('./dist'),
      publicPath: "/"
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json", ".html"],
      modules: ["node_modules", path.resolve(__dirname, "..", "src")]
    },
    devServer: {        
      port: '3000'    
    },
    resolveLoader: { 
      modules: ["node_modules"]
    },
    module: {        
      rules: [
        { 
          test: /\.ts(x?)$/,
          loader: "ts-loader",
          exclude: /node_modules/            
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: "html-loader"            
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },        
      ]    
    },
    plugins: [
      new HtmlWebpackPlugin({template: "src/index.html", hash: true}),
      // new BundleAnalyzerPlugin({analyzerPort: 8888})    ]};
    ]
}