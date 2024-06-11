const webpack = require('webpack');

module.exports = {
  // altre configurazioni di Webpack...
  resolve: {
    fallback: {
      "net": false, // Disabilita il caricamento del modulo 'net'
      // altri fallback necessari per le dipendenze CommonJS...
    }
  }
};
