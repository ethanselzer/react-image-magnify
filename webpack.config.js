const path = require('path');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const NAME = 'ReactImageMagnify';
const DIST = path.resolve('./dist');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const core = {
    devtool: 'source-map',
    devServer: {
        contentBase: DIST,
        hot: true,
        port: 3000,
        historyApiFallback: true,
    },
    entry: ['./src/index.ts'],
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
        plugins: [new TsconfigPathsPlugin()],
    },
};

module.exports = [{
    ...core,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [/node_modules/, /__tests__/, /__mocks__/],
                options: {
                    configFile: IS_PRODUCTION ? 'tsconfig.json' : 'tsconfig.dev.json',
                    compilerOptions: {
                        module: 'commonjs',
                        target: 'es6',
                    },
                    getCustomTransformers: () => ({
                        before: IS_PRODUCTION ? [] : [ReactRefreshTypeScript()],
                    }),
                },
            },
        ],
    },
    output: {
        path: DIST,
        filename: `${NAME}.js`,
        library: {
            type: 'commonjs2',
        },
    },
}];
