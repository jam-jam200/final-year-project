const socket = io("/:room")

window.onload = function () {
  var el = document.getElementById("stud");
  el.onclick = click;
};

function click() {
  location.href = "/contact_info";
}

window.onload = function () {
  var el = document.getElementById("teach");
  el.onclick = click;
};

function click() {
  location.href = "/contact_info";
}

// room coding
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });

socket.emit("join-room");

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
