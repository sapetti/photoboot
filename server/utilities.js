const { exec } = require('child_process')

function runCmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      err && reject(err)
      resolve({ out: stdout, err: stderr })
    })
  })
}

function startBrowserFullscreen() {
  return runCmd('chromium-browser --app=http://localhost:3000 --start-fullscreen')
}

function tap(fn) {
  return input => {
    fn(input)
    return input
  }
}

function trace(msg) {
  return tap(x => console.log(msg + ':: ' + x))
}

module.exports = {
  runCmd,
  startBrowserFullscreen,
  tap,
  trace
}
