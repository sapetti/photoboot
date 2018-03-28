require('isomorphic-fetch')
const Dropbox = require('dropbox').Dropbox,
  { accessToken, photoFolder } = require('./config'),
  { readFile } = require('./files')

const dbx = new Dropbox({ accessToken })

function upload(filename) {
  return readFile(`${photoFolder}/${filename}`).then(contents => dbx.filesUpload({ path: `/${filename}`, contents }))
}

module.exports = {
  upload
}
