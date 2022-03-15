window.onload = function () {
  var teach = document.getElementById("teacher");
  var el = document.getElementById("student");
  teach.onclick = teachClick;
  el.onclick = studClick;
};

function teachClick() {
  location.href = "/contact_info";
}
function studClick() {
  location.href = "/contact_info";
}

// room coding
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

let myVideoStream;

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });
