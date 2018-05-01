const express = require('express'),
  compression = require('compression'),
  fs = require('fs'),
  //photo = require('./photo')
  ws = require('./websocket')

// module.exports = (function server() {
//   return new Promise((resolve, reject) => {
//     const app = express()
//     const server = require('http').Server(app)
//     const io = require('socket.io')(server)

//    server.listen(3000)

//     // Middleware setup
//     app.use(express.static(__dirname + '/../client'))
//     app.use(compression())

//     ws(io)

//     resolve()
//   })
// })()
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
    // Start the server
    const server = https.createServer(options, app).listen(8443)
    const  io = require('socket.io')(server)
    ws(io)
    console.log('Started')
    resolve()
  })
})()
