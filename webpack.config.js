const path = require('path');

module.exports = {
  entry: ['./src/main.js'],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@types': path.resolve(__dirname, 'src/api/types.ts'),
      'api/auth_ts': path.resolve(__dirname, 'src/api/auth.ts'),
    },
    extensions: ['.tsx', '.ts', '.js', '.vue'],
  },
};