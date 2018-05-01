const fs = require('fs'),
//  path = require('path'),
  { execCmd } = require('./utilities'),
  { archiveFolder, photoFolder } = require('./config')

function archiveFile(filename) {
console.log('archiving...')
  return execCmd(`mv ${photoFolder}/${filename} ${archiveFolder}`)
}

function readFile(file) {
console.log('reading file...')
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, contents) => {
      err && reject(err)
      resolve(contents)
    })
  })
}

module.exports = {
  readFile,
  archiveFile
}
