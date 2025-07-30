/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    'handlers/blogGeneration': './handlers/blogGeneration.js',
    'handlers/videoCacheRefresh': './handlers/videoCacheRefresh.js'
  },
  target: 'node',
  mode: 'production',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      // Resolve blog generation scripts relative to project root
      '@blog-scripts': path.resolve(__dirname, '../../../scripts/blog-generation'),
      '@project-root': path.resolve(__dirname, '../../../')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  optimization: {
    minimize: false
  }
}
