const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        static: "./dist",
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
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
        ],
    },
});
