const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    output: {
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    entry: {
        index: "./src/pages/index.ts",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/pages/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: ["handlebars-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: "assets/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "assets/resource",
            },
        ],
    },
};
