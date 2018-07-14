var { execCmd, spawnCmd, trace } = require('./utilities'),
  { photoFolder, photo_sh, print_sh, montage_sh } = require('./config')

const captureImage = filename => execCmd(`gphoto2 --capture-image-and-download --filename ${photoFolder}/${filename}`)

const handleCountDown = (socket, count, shots, time, resolve) => {
  socket.emit('countdown', { count, shots, time })
  if (count > 0) setTimeout(() => handleCountDown(socket, --count, shots, time, resolve), 1500)
  else resolve()
}

const countdown = (socket, count, shots, time) =>
  new Promise((resolve, reject) => handleCountDown(socket, count, shots, time, resolve))

const takePhoto = (socket, shots = 1, time = 1, filenames = []) => {
  console.log('photo!')
  const filename = `photo-${new Date().getTime()}.jpg`
  const files = filenames.concat(filename)
  return countdown(socket, 3, shots, time)
    .then(_ => captureImage(filename))
    .then(_ => (shots - time > 0 ? takePhoto(socket, shots, ++time, files) : files))
}

const onTakePhoto = socket => options => {
  const { print, montage, shots } = options
  //TODOs:
  //  - Photo preview?
  //  - Sync countdown - Done? Test it
  //  - Spawn upload to Dropbox and print, now in promise chain...
  //  - Handle in client: countdown, ready
  takePhoto(socket, shots)
    .then(trace('Photos taken'))
    .then(
      photos =>
        montage ? spawnCmd(montage_sh, photos) :
        print   ? spawnCmd(print_sh, photos)
                : spawnCmd(photo_sh, photos)
    )
    .then(trace('Script running'))
    .then(_ => socket.emit('ready')) // Photo is taken... let the UI progress... photo preview??
    .then(trace('Sent ready'))
    .catch(err => {
      console.error(err)
      socket.emit('photo-error')
    })
}

module.exports = function(io) {
  io.on('connection', socket => {
    console.log('client connected...')
    socket.on('take-photo', onTakePhoto(socket))
  })
}
