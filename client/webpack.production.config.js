var path = require("path");
var webpack = require("webpack");

// stylus : needed for production
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var stylusLoader = ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader");

module.exports = {
    minimize: true,
    entry: [
        "./src/index"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "sorcery.js",
        publicPath: "/static/"
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("sorcery.css")
    ],
    resolve: {
        extensions: ["", ".js", ".jsx", ".styl"]
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ["react-hot", "babel"],
            include: path.join(__dirname, "src")
        },
        { 
            test: /\.styl$/, 
            loader: stylusLoader
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                "file?hash=sha512&digest=hex&name=[hash].[ext]",
                "image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"
            ]
        }]
    },
    externals: {
        "config": "{serverUrl: 'http://ec2-54-164-172-235.compute-1.amazonaws.com:5000'}"
    }
};
