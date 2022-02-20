require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com", "ipfs.io"],
  },

  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
};
