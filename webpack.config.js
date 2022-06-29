const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     exclude: /node_modules|sortable/,
            //     loader: 'eslint-loader'
            // }

        ]
    },
    mode: 'development',
    devtool: 'eval-source-map'
};
