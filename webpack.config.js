const path = require('path');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DIST = path.resolve('./dist');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = [{
    devtool: 'source-map',
    devServer: {
        contentBase: DIST,
        hot: true,
        port: 3000,
        historyApiFallback: true,
    },
    entry: ['./index.ts'],
    externals: {
        react: 'react',
        'react-dom': 'reactDOM',
    },
    mode: IS_PRODUCTION ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [/node_modules/, /__tests__/, /__mocks__/, /stories/],
                options: {
                    configFile: IS_PRODUCTION ? 'tsconfig.prod.json' : 'tsconfig.dev.json',
                    compilerOptions: {
                        module: 'commonjs',
                        target: 'es6',
                    },
                    getCustomTransformers: () => ({
                        before: [!IS_PRODUCTION && ReactRefreshTypeScript()].filter(Boolean),
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
        filename: 'index.js',
        library: {
            type: 'commonjs2',
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
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
        !IS_PRODUCTION ? new webpack.HotModuleReplacementPlugin() : null,
        !IS_PRODUCTION ? new ReactRefreshWebpackPlugin() : null,
    ].filter(Boolean),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({
            configFile: IS_PRODUCTION ? 'tsconfig.prod.json' : 'tsconfig.dev.json',
        })],
    },
}];
