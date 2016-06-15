var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8081',
        path.resolve(__dirname, 'src/ko-bindings.js')
    ],
    resolve: {
        root: [__dirname, path.join(__dirname, 'src/')],
        alias: {
            // scalejs

            'scalejs.application': path.join(__dirname, 'node_modules/scalejs/dist/scalejs.application.js'),
            'scalejs.core': path.join(__dirname, 'node_modules/scalejs/dist/scalejs.core.js'),
            'scalejs.sandbox': path.join(__dirname, 'node_modules/scalejs/dist/scalejs.sandbox.js'),

            // extensions
            'scalejs.extensions': path.join(__dirname, 'public/src/extensions/scalejs.extensions.js'),
            'dataservice': 'extensions/dataservice.js',
            'userservice': 'extensions/userservice.js',
            'functionRegistry': 'extensions/functionRegistry.js',

            // jquery.inputmask, to be migrated to webpack and npm
            'inputmask': path.join(__dirname, 'node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask'),
            'jquery.inputmask.date.extensions': path.join(__dirname, 'node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask.date.extensions'),

            // requirejs-text, to be migrated to webpack and webpack html loader
            'text': 'npm_modules/requirejs-text/text', //still using this anywhere?
            'popup-styles.css': path.join(__dirname, 'node_modules/scalejs.popup/src/styles/popup-styles.css'),
            'sass': path.join(__dirname, 'public/sass')

        }
    },
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    resolveLoader: {
        alias: {
            'sass-global-vars-loader': path.join(__dirname, 'public/loaders/sass-global-vars-loader'),
            'px-to-em': path.join(__dirname, 'public/loaders/px-to-em')
        }
    },
    module: {
        // testing custom sass code
        preLoaders: [
            {
                test: /\.scss/, loader: 'sass-global-vars-loader'
            },
            {
                test: /sprite.css/, loader: 'px-to-em'
            },
            {
                test: [
                    path.join(__dirname, 'node_modules/scalejs')
                ],
                loader: 'source-map-loader'
            }
        ],
        loaders: [
            {
                loader: 'babel-loader',
                test: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'test/tests')
                ],
                exclude: /\.html?$/,
                query: {
                    presets: 'es2015',
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-url-loader'
            // },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.png|\.jpg|\.ttf/,
                loader: 'url?prefix=font/&limit=10000'
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    // Create Sourcemaps for the bundle
    devtool: 'cheap-module-eval-source-map'
    // NOTE: if your debugger isnt working the greatest, use 'eval' devtool
    // source-map has an issue where sometimes your debugger is off by one line
    //devtool: 'eval'
};
