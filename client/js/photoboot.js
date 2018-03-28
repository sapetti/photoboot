var module = (function(window, navigator, document, undefined) {
  const COUNTDOWN_SECS = 3
  const COUNTDOWN_DELAY = 1000
  const video = document.querySelector('#videoElement')
  const counter = document.getElementById('counter')

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    navigator.oGetUserMedia

  navigator.getUserMedia && navigator.getUserMedia({ video: true }, handleVideo, videoError)
  // navigator.getUserMedia({ video: {width: {exact: 320}, height: {exact: 240}} }, handleVideo, videoError);
  // navigator.getUserMedia({ video: {width: {exact: 640}, height: {exact: 480}} }, handleVideo, videoError);

  function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream)
  }

  function videoError(e) {
    console.error(e)
  }

  function updateCounter(text) {
    counter.style.display = text ? 'block' : 'none'
    counter.innerHTML = text || ''
    return true
  }

  function handleCountDown(count, callback) {
    updateCounter(`<h1>${count}</h1>`)
    count > 0 && setTimeout(() => handleCountDown(--count, callback), COUNTDOWN_DELAY)
    count < 1 && updateCounter() && callback()
  }

  function countdown(count) {
    return new Promise((resolve, reject) => handleCountDown(count, resolve))
  }

  function photo({ print }) {
    countdown(COUNTDOWN_SECS)
      .then(_ => fetch(`/photo?print=${print}`))
      .then(response => response.json())
      //TODO: log the error??? just in DEV
      .then(response => console.log('response:: ' + JSON.stringify(response)))
  }

  return {
    photo
  }
})(window, navigator, document)

var photo = module.photo
