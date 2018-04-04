var router = require('express').Router(),
  { runCmd, trace } = require('./utilities'),
  { takePhoto, printPhoto } = require('./photo'),
  { upload } = require('./cloud'),
  { archiveFile } = require('./files'),
  { archiveFolder } = require('./config')

router.get('/photo', ({ query: { print } }, res) => {
  const t = new Date().getTime(),
    filename = `photo-${t}.jpg`
  print = (print === 'true') // Cast to boolean
  console.log('taking photo...' + print)
  //TODOs:
  //  - Photo preview?
  //  - Do you want to print?
  //  - Sync countdown - Done? Test it
  takePhoto(filename)
    .then(trace('Photo taken:: ' + filename))
    .then(_ => res.status(201).send('Photo taken')) // Photo is taken... let the UI progress... photo preview??
    .then(trace('Status 201 sent'))
    .then(_ => upload(filename))
    .then(trace('Photo uploaded'))
    .then(_ => archiveFile(filename))
    .then(trace('Photo archived'))
    .then(_ => print && printPhoto({ path: archiveFolder, filename })) // Set as last step to don't interrup response, uploading or archiving...
    .then(trace('Should the photo be printed: ' + print))
    .catch(err => {
      console.error(err)
      // It won't matter if the response was sent...
      //res.status(500).send('Error while processing photo')
    })
})

module.exports = router
