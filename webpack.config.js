const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/src/index.ts',
    //watch: true,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname+'/client', 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    }
};