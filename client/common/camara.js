function changeColor(newColor) {
    let elem = document.getElementById("datos");
    elem.style.color = newColor;
  }
  const constraints = {
    audio: false,
    video: {
      width: 640, height: 360
    }
  };
  
  // Access webcam
  async function init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
  }
  
  // Success
  function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
  }
  
  // Load init
  init();
  
  // Draw image
  var context = canvas.getContext('2d');
  snap.addEventListener("click", function() {
          context.drawImage(video, 0, 0, 640, 480);
  });