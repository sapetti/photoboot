const { photo, exitVideoMode } = (function(window, navigator, document, undefined) {
  //const socket = io.connect('https://localhost:8443', { forceNew: true })
  const socket = io.connect('https://192.168.0.167:8443', { forceNew: true })
  //const socket = io('http://localhost:3000')
  socket.on('countdown', updateCounter)
  socket.on('photo-error', exitVideoMode) // On error just show the menu, maybe the camera was not able to take the photo
  socket.on('ready', exitVideoMode) // TODO: show preview or nothing??

  const menuCard = document.querySelector('#menu-card')
  const container = document.querySelector('#container')
  const videoCard = document.querySelector('#video-card')
  const videoPlayer = document.querySelector('#video-element')
  const counter = document.querySelector('#counter')
  const progress = document.querySelector('#progress')
  const constraints = { audio: false, video: { width: 640, height: 480 } }

  menuCard.style.display = 'none'
  videoCard.style.display = 'block'

  navigator.mediaDevices.getUserMedia =
    navigator.mediaDevices.getUserMedia ||
    navigator.mediaDevices.webkitGetUserMedia ||
    navigator.mediaDevices.mozGetUserMedia ||
    navigator.mediaDevices.msGetUserMedia ||
    navigator.mediaDevices.oGetUserMedia

  function updateCounter({ count, shots, time }) {
    counter.style.display = count ? 'block' : 'none'
    counter.innerHTML = count ? `<h1>${count}</h1>` : ''
    progress.innerHTML = count ? `<h3>${time}/${shots}</h3>` : ''
  }

  function toggleVisibility(element) {
    element.style.display = element.style.display === 'none' ? 'block' : 'none'
  }

  function toggleButtonsStatus() {
    ;[].forEach.call(
      document.querySelector('button'), 
      element => {
        element.disabled = !element.disabled
        element.classList.toggle('photoDisabled')
    })
  }

  function exitVideoMode() {
    toggleButtonsStatus()
    toggleVisibility(menuCard)
    toggleVisibility(videoCard)
    videoPlayer.pause()
    if (videoPlayer.src) videoPlayer.src = null
  }

  function enterVideoMode() {
    //TODO: loading spinner??
    return Promise.resolve().then(_ => {
      toggleButtonsStatus()
      toggleVisibility(menuCard)
      toggleVisibility(videoCard)
      return navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => (videoPlayer.src = window.URL.createObjectURL(stream)))
        .catch(e => console.error(e))
    })
  }

  function photo(options) {
    return enterVideoMode().then(_ => socket.emit('take-photo', options))
  }

  return {
    photo,
    exitVideoMode
  }
})(window, navigator, document)
