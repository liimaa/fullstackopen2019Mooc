const path = require('path')

const config = () => {

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000, 
      proxy: {
        '/api': 'http://localhost:3001'
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-react'],
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }
      ],
    }
  }
}

module.exports = config