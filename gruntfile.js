'use strict';

var _ = require('lodash');
var webpack = require('webpack');

var mergeWebpackConfig = function (config) {
  // Load webpackConfig only when using `grunt:webpack`
  // load of grunt tasks is faster
  var webpackConfig = require('./webpack.config');
  return _.merge({}, webpackConfig, config, function (a, b) {
    if (_.isArray(a)) {
      return a.concat(b);
    }
  });
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      min: {
        files: {
          'dist/react-datepicker.css': 'src/stylesheets/datepicker.scss'
        },
        options: {
          sourcemap: 'none',
          style: 'expanded'
        }
      },
      unmin: {
        files: {
          'dist/react-datepicker-compat.min.css': 'src/stylesheets/datepicker.scss'
        },
        options: {
          sourcemap: 'none',
          style: 'compressed'
        }
      }
    },

    watch: {
      jshint: {
        files: ['src/**/*.js', 'src/**/*.jsx'],
        tasks: ['jshint']
      },

      jest: {
        files: ['test/**/*.js'],
        tasks: ['jest']
      },

      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },

      webpack: {
        files: ['src/**/*.js', 'src/**/*.jsx'],
        tasks: ['webpack']
      }
    },

    scsslint: {
      files: 'src/stylesheets/*.scss',
      options: {
        config: '.scss-lint.yml',
        colorizeOutput: true
      }
    },

    jshint: {
      all: ['src/**/*.jsx', 'src/**/*.js'],
      options: {
        eqnull: true
      }
    },

    webpack: {
      unmin: mergeWebpackConfig({
        output: {
          filename: 'react-datepicker-compat.js'
        }
      }),
      min: mergeWebpackConfig({
        output: {
          filename: 'react-datepicker-compat.min.js'
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compressor: {
              warnings: false
            }
          })
        ]
      })
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['watch', 'scsslint']);
  grunt.registerTask('travis', ['jshint', 'jest', 'scsslint']);
  grunt.registerTask('build', ['jshint', 'scsslint', 'webpack', 'sass']);

  grunt.registerTask('jest', require('./grunt/tasks/jest'));
};
