var path = require("path");
var webpack = require("webpack");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: "eval",
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        "./src/index"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "sorcery.js",
        publicPath: "/static/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("sorcery.css")
    ],
    resolve: {
        extensions: ["", ".js", ".jsx", ".styl"]
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            loaders: ["react-hot", "babel"],
            include: path.join(__dirname, "src")
        },
        { 
            test: /\.styl$/, 
            loader: "style-loader!css-loader!stylus-loader"
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
        "config": "{serverUrl: 'http://localhost:5000'}"
    }
};
