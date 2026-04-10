const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    entry:'./src/index.js',
    output:{
        filename:'./js/lit-html.js',
        library: {
            type: 'module',
        },
    },
    experiments: {
        outputModule: true,
    },
    plugins:[],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false,     // ❌ prevent renaming variables
                    compress: true,   // optional: keep code readable
                    format: {
                        beautify: false,  // pretty output
                        comments: false,  // keep comments
                    },
                },
            }),
        ],
    },

}
