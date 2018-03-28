const { runCmd } = require('./utilities'),
  { photoFolder } = require('./config')

function takePhoto(filename) {
  return runCmd(`gphoto2 --capture-image-and-download --filename ${photoFolder}/${filename}`)
}

function printPhoto(path, filename) {
  return runCmd(`print photo..... ${path}/${filename}`)
}

module.exports = {
  printPhoto,
  takePhoto
}
