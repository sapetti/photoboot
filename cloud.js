require('isomorphic-fetch')
const Dropbox = require('dropbox').Dropbox
const { accessToken } = require('./config')
const { readFile, archiveFile } = require('./files')
const dbx = new Dropbox({ accessToken })

function uploadFile(filename) {
  return readFile(`/${filename}`).then(contents =>
    dbx.filesUpload({ path: `/${filename}`, contents })
  )
}

module.exports = {
  uploadFile
}
