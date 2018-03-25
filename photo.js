// gphoto2 --capture-image-and-download --filename path/file

const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
const { archiveFolder, photoFolder } = require('./config')

function takePhoto(filename) {
  return new Promise((resolve, reject) => {
    exec(
      `gphoto2 --capture-image-and-download --filename ${photoFolder}${filename}`,
      (err, stdout, stderr) => {
        err && reject(err)
        stderr && reject(stderr)
        resolve(true)
      }
    )
  })
}

function printPhoto(filename) {
  return new Promise((resolve, reject) => {
    exec(
      `print photo..... ${photoFolder}${filename}`,
      (err, stdout, stderr) => {
        err && reject(err)
        stderr && reject(stderr)
        resolve(true)
      }
    )
  })
}

module.exports = {
  printPhoto,
  takePhoto
}
