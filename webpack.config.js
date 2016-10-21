module.exports = {
  entry: './rtsupport/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: '/\.jsx?$/',
        loader: 'babel-loader',
        exclude: '/node_modules/',
        query: {presets:['es2015', 'react']}
      }
    ],
    preLoaders: [
      {
        test: '/\.jsx?$/',
        exclude: '/node_modules/',
        loader: 'eslint-loader'
      }
    ]
  }
}
