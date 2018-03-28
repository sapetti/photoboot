const express = require('express'),
  compression = require('compression'),
  router = require('./router')

module.exports = (function server() {
  return new Promise((resolve, reject) => {
    const app = express()

    // Middleware setup
    app.use(express.static(__dirname + '/../client'))
    app.use(compression())

    // Routes
    app.use(router)

    // Start the server
    app.listen(process.env.PORT || 3000, () => resolve('Listening at port 3000'))
  })
})()
