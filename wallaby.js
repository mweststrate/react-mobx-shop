module.exports = function (wallaby) {
  // Babel, jest-cli and some other modules are located under
  // react-scripts/node_modules, so need to let node.js know about it
  var path = require('path')
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/custom-react-scripts/node_modules')
  require('module').Module._initPaths()

  // Babel needs this
  process.env.NODE_ENV = 'development'

  return {
    files: [
      'src/**/*.js',
      '!src/**/*.test.js',
      { pattern: 'public/*.json', instrument: false, load: true, ignore: false }
    ],

    tests: ['src/**/*.test.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app'],
        plugins: ['transform-decorators-legacy']
      })
    },

    setup: (wallaby) => {
      wallaby.testFramework.configure({
        // as in node_modules/react-scripts/utils/createJestConfig.js
        moduleNameMapper: {
          '^.+\\.(jpg|jpeg|png|gif|svg)$': require.resolve('custom-react-scripts/config/jest/fileTransform.js'),
          '^.+\\.css$': require.resolve('custom-react-scripts/config/jest/cssTransform.js')
        }
      })
    },

    testFramework: 'jest'
  }
}