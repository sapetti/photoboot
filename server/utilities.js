const { exec, spawn } = require('child_process')

function execCmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      err && reject(err)
      resolve({ out: stdout, err: stderr })
    })
  })
}

function spawnCmd(cmd, args, detached = true) {
  const child = spawn(cmd, args, { detached }).on('error', err => console.log(err))
  child.stdout.on('data', data => console.log(`stdout: ${data}`))
  child.stderr.on('data', data => console.log(`stderr: ${data}`))
  child.on('close', code => console.log(`child process exited with code ${code}`))
  return child
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
