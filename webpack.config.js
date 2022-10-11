const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
if (process.env.NODE_ENV.trim() === "production") {
    mode = "production";
}
console.log(`${mode} mode`);

module.exports = {
    mode,
    output: {
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devtool: "source-map",
    entry: {
        index: "./src/pages/index.ts",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
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
                test: /\.(sass|scss|css)$/,
                exclude: /node_modules/,
                use: [
                    mode === "development"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
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
