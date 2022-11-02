// const CracoLessPlugin = require('craco-less')
const webpack = require('webpack')

module.exports = {
  webpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
    configure: {
        resolve: {
            fallback: {
                'crypto': require.resolve('crypto-browserify'),
                'stream': require.resolve('stream-browserify')
            }
        }
    }
  },
  babel: {
    plugins: ['babel-plugin-styled-components'],
  },
//   plugins: [
//     {
//       plugin: CracoLessPlugin,
//       options: {
//         lessLoaderOptions: {
//           lessOptions: {
//             javascriptEnabled: true,
//           },
//         },
//       },
//     },
//   ],
}
