// Karma configuration
// Generated on Thu Jun 09 2016 08:51:10 GMT-0400 (EDT)
var webpackConfig = require('../../webpack.config');
var path = require('path');
// Set the entry to an empty object or it will cause the tests to fail.
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha-debug', 'mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
        'test/karma_config/test-main.js',
        'test/tests/*.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // Entry point of the app. Redefine in karma config
    preprocessors: {
      'src/*.js': ['webpack'],
      'test/tests/*.js': ['webpack']
    },

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9004,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Inject webpack config
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-mocha-debug'),
      require('karma-chai'),
      require('karma-chrome-launcher')
    ]
  })
}
