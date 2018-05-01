const { exec, spawn } = require('child_process')

function execCmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      err && reject(err)
      resolve({ out: stdout, err: stderr })
    })
  })
}

function spawnCmd(cmd, args, detached = false) {
  return spawn(cmd, args, { detached }).on('error', err => console.log(err))
}


function startBrowserFullscreen() {
  return execCmd('chromium-browser --app=https://localhost:8443 --start-fullscreen')
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
  execCmd,
  spawnCmd,
  startBrowserFullscreen,
  tap,
  trace
}
