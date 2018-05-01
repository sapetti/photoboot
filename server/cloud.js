require('isomorphic-fetch')
const Dropbox = require('dropbox').Dropbox,
  { accessToken, archiveFolder } = require('./config'),
  { readFile } = require('./files')

const dbx = new Dropbox({ accessToken })

// function upload(filename) {
//   console.log(`Uploading ${photoFolder}/${filename}`)
//   return readFile(`${photoFolder}/${filename}`).then(contents => dbx.filesUpload({ path: `/${filename}`, contents }))
// }

function upload(filename) {
  console.log(`Uploading ${filename}`)
  return readFile(`${archiveFolder}/${filename}`).then(contents => dbx.filesUpload({ path: `/${filename}`, contents })).catch(err => console.error(err))
}

// module.exports = {
//   upload
// }

process.argv.filter(arg => arg.endsWith('.jpg')).forEach(upload)
