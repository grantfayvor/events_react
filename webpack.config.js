const webpack = require('webpack'),
  path = require('path'),
  dotenv = require('dotenv');

module.exports = () => {

  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: './src/index.jsx',
    mode: 'development',
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          use: [{
            loader: 'babel-loader',
            query: {
              compact: false
            }
          }],
          include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules/react-toolbox")
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/src/dist',
      publicPath: '/',
      filename: 'main.bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
      contentBase: './src',
      hot: true,
      historyApiFallback: true,
      inline: true,
      port: 8080,
      proxy: {
        "/_events/v1/**": {
          target: {
            host: process.env.APP_HOST || "127.0.0.1",
            protocol: process.env.APP_PROTOCOL || "http",
            port: process.env.APP_PORT || 3000
          },
          // changeOrigin:true,
          secure: false,
          pathRewrite: {
            '^/_events/v1': ''
          }
        }
      }
    }
  };
};