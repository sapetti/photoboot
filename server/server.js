const express = require('express'),
  compression = require('compression'),
  router = require('./router'),
  fs = require('fs')

module.exports = (function server() {
  return new Promise((resolve, reject) => {
    const https = require('https')
    const app = express()
    const options = {
      key: fs.readFileSync(__dirname + '/../security/key.pem'),
      cert: fs.readFileSync(__dirname + '/../security/cert.pem'),
      passphrase: 'thisisaphotoboot'
    }

    // Middleware setup
    app.use(express.static(__dirname + '/../client'))
    app.use(compression())

    // Routes
    //app.use(router)

    // Start the server
    //app.listen(process.env.PORT || 3000, () => resolve('Listening at port 3000'))
    const server = https.createServer(options, app).listen(8443)
    const  io = require('socket.io')(server)

    // Routes
    app.use(router(io))

    resolve()
  })
})()
