const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
const { archiveFolder, photoFolder } = require('./config')

function archiveFile(filename) {
  return new Promise((resolve, reject) => {
    exec(`mv ${photoPath}${filename} ${archivePath}`, (err, stdout, stderr) => {
      err && reject(err)
      stderr && reject(stderr)
      resolve(true)
    })
  })
}

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), 'utf8', (err, contents) => {
      err && reject(err)
      resolve(contents)
    })
  })
}

module.exports = {
  readFile,
  archiveFile
}
