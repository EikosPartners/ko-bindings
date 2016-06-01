var path = require('path'),
    nodeExternals = require('webpack-node-externals');

module.exports = {
    entry : path.join(__dirname, 'ko-bindings/ko-bindings.js'),
    output : {
        path : 'dist',
        filename : 'ko-bindings.js'
    },
    resolve : {
        root : [__dirname, path.join(__dirname, 'ko-bindings/')],
        alias : {
            'scalejs.core' : path.join(__dirname, 'node_modules/scalejs/dist/scalejs.core.js')
        }
    },
    externals : [nodeExternals()],
    module : {
        loaders : [
            {
                loader : 'babel-loader',
                test : [
                    path.join(__dirname, 'ko-bindings/ko-bindings.js')
                ],
                query : {
                    presets : 'es2015'
                }
            }
        ]
    }
};
