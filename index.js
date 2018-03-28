const server = require('./server/server'),
  { runCmd, startBrowserFullscreen, trace } = require('./server/utilities')

server
  .then(trace('Server started'))
  .then(startBrowserFullscreen)
  .then(trace('Chromium started'))
  // TODOs:
  //  - config screen saver
  //  - config mouse
  //  - anything else??
  .catch(trace('Error starting server'))
