import { setTimeout } from 'timers'

const { runCmd } = require('./utilities'),
  { photoFolder, printer } = require('./config')

var queue = []

function takePhoto(filename) {
  return runCmd(`gphoto2 --capture-image-and-download --filename ${photoFolder}/${filename}`)
}

// function printPhoto({ path, filename, retry = 0 }) {
//   queue = [...queue, { path, filename, retry }]
// }

// function queueManager() {
//   setTimeout(() => {
//     queue = queue.reduce((acc, photo) => {
//       isPrinterIdle().then(isIdle => {
//         if (!isIdle) return acc.concat(photo)
//         sendPhotoToPrinter(photo)
//         return acc
//       })
//     }, [])
//     queueManager() // wait to handle the next queue item
//   }, 30000)
// }

function sendPhotoToPrinter({ path, filename, retry }) {
  return runCmd(`lp -d ${printer} ${path}/${filename}`)
  // .catch(err => {
  //   console.error(err)
  //   if (retry < 5) printPhoto({ path, filename, retry: retry++ })
  // })
}

function isPrinterIdle() {
  return runCmd(`lpstat -p ${printer} ${path}/${filename}`).then(({ out }) => out.includes('is idle'))
}

module.exports = {
  printPhoto: sendPhotoToPrinter,
  takePhoto
}
