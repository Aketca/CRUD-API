const path = require('node:path');

module.exports = {
    entry: './src/index.ts',
    mode: "production",
    target: "node",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts"],
    },
};