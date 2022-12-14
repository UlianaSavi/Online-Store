let mode = 'development';

if (process.env.MODE_ENV === 'production') {
  mode = 'production'
}

module.exports = {
  mode: mode,
  plugins: [],
  module: {
    rules: []
  }
}