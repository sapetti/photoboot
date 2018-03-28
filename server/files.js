const fs = require('fs'),
  path = require('path'),
  { runCmd } = require('./utilities'),
  { archiveFolder, photoFolder } = require('./config')

function archiveFile(filename) {
  return runCmd(`mv ${photoPath}/${filename} ${archivePath}`)
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
