var router = require('express').Router(),
  { execCmd, spawnCmd, trace } = require('./utilities'),
  { takePhoto, printPhoto } = require('./photo'),
  { upload } = require('./cloud'),
  { archiveFile } = require('./files'),
  { archiveFolder } = require('./config')

const handleCountDown = (count, socket, resolve) => {
  socket.emit('countdown', { count })
  if(count > 0) setTimeout(() => handleCountDown(--count, socket, resolve), 1000)
  else resolve()
}

const countdown = (socket, count) => new Promise((resolve, reject) => handleCount(socket, count, resolve))

const onTakePhoto = socket => ({print}) {
  const t = new Date().getTime(),
    filename = `photo-${t}.jpg`
  print = (print === 'true') // Cast to boolean
  console.log('taking photo...' + print)
  //TODOs:
  //  - Photo preview?
  //  - Sync countdown - Done? Test it
  //  - Spawn upload to Dropbox and print, now in promise chain...
  //  - Handle in client: countdown, photo-taken
  countdown(socket, 3)
    .then(() => takePhoto(filename))
    .then(trace('Photo taken:: ' + filename))
    .then(_ => socket.emit('photo-taken')) // Photo is taken... let the UI progress... photo preview??
    .then(trace('Status 201 sent'))
    .then(_ => upload(filename)) // Spawn this, get photo from archived folder
    .then(trace('Photo uploaded'))
    .then(_ => archiveFile(filename))
    .then(trace('Photo archived'))
    .then(_ => print && printPhoto({ path: archiveFolder, filename })) // Spawn this, get photo from archived folder
    .then(trace('Should the photo be printed: ' + print))
    .catch(err => console.error(err))
}



module.exports = function(io) {
  io.on('connection', socket => socket.on('take-photo', onTakePhoto(socket)))
}
