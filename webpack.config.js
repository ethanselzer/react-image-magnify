const path = require('path');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const WebpackCleanPlugin = require('webpack-clean-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const DIST = path.resolve('./dist');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: DIST,
        hot: true,
        port: 3000,
        historyApiFallback: true,
    },
    entry: './src/ReactImageMagnify.js',
    externals: {
        react: 'react',
    },
    mode: IS_PRODUCTION ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'html-loader',
            }, {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [/node_modules/, /__tests__/, /__mocks__/],
                options: {
                    configFile: IS_PRODUCTION ? 'tsconfig.json' : 'tsconfig.dev.json',
                    getCustomTransformers: () => ({
                        before: IS_PRODUCTION ? [] : [ReactRefreshTypeScript()],
                    }),
                },
            },
        ],
    },
    optimization: {
        concatenateModules: true,
        minimizer: [
            new TerserJSPlugin({
                parallel: 2,
            }),
        ],
        providedExports: true,
        sideEffects: true,
        usedExports: true,
    },
    output: {
        path: DIST,
        filename: 'ReactImageMagnify.js',
        library: 'ReactImageMagnify',
    },
    plugins: [
        new WebpackCleanPlugin(),
        new BundleAnalyzerPlugin({
            /**
             * Can be `server`, `static` or `disabled`.
             * In `server` mode analyzer will start HTTP server to show bundle report.
             * In `static` mode single HTML file with bundle report will be generated.
             * In `disabled` mode you can use this plugin to just generate Webpack Stats
             * JSON file by setting `generateStatsFile` to true.
             */
            analyzerMode: 'disabled',
        }),
        !IS_PRODUCTION ? new webpack.HtmlWebpackPlugin({
            template: 'example/index.html',
        }) : null,
        !IS_PRODUCTION ? new webpack.HotModuleReplacementPlugin() : null,
        !IS_PRODUCTION ? new ReactRefreshWebpackPlugin() : null,
    ].filter(Boolean),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
};
