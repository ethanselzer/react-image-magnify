var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/ReactImageMagnify.js',
    output: {
        path: path.resolve(__dirname, './dist/umd'),
        filename: 'ReactImageMagnify.js',
        library: 'ReactImageMagnify',
        libraryTarget: 'umd'
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            umd: 'react',
            root: 'React'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [new BundleAnalyzerPlugin({
        /**
         * Can be `server`, `static` or `disabled`.
         * In `server` mode analyzer will start HTTP server to show bundle report.
         * In `static` mode single HTML file with bundle report will be generated.
         * In `disabled` mode you can use this plugin to just generate Webpack Stats
         * JSON file by setting `generateStatsFile` to true.
         */
        analyzerMode: 'disabled',
    })]
};
