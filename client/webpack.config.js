const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

const is_prod = process.env.NODE_ENV.trim() === 'production'
console.log(process.env.NODE_ENV)

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
    title: 'text'
  }),
]
if (is_prod) {

  plugins.push(...[
    new WebpackPwaManifest({
      name: 'jate editor',
      short_name: 'jate_ed',
      description: 'this is a progressive web app that can run in the browser both online and offline',
      background_color: '#fff',
      theme_color: '#2F4ced',
      publicPath:'/',
      inject:true,
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256.384, 512]
        }
      ],
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js'
    })
  ])
}
module.exports = () => {
  return {
    mode: is_prod ? 'production' : 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins,

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
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
      ],
    },
  };
};
