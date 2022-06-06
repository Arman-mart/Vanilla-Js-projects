const player = document.querySelector(".player");
const playBtn = document.querySelector(".play-pause");
const playBtnIcon = playBtn.querySelector("i.fas");
const videoTime = document.querySelector("#video-time");
const videoDuration = document.querySelector("#video-duration");
const video = document.querySelector(".video");
const selectVideoSpeed = document.getElementById("video-speed");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const resetBtn = document.querySelector(".reset");

const { playVideo, pauseVideo } = (() => {
  let intervalIndex;

  return {
    playVideo: () => {
      video.play();
      player.classList.add("play");
      updatePlayClasses(playBtnIcon);
      intervalIndex = setInterval(functionsPendingUpdate, 300);
    },
    pauseVideo: () => {
      video.pause();
      player.classList.remove("play");
      updatePlayClasses(playBtnIcon);
      clearInterval(intervalIndex);
    },
  };
})();

function updateTime() {
  videoDuration.innerHTML = Math.floor(video.duration);
  videoTime.innerHTML = Math.floor(video.currentTime);
}

function updateProgressBar() {
  const duration = video.duration;
  const currentTime = video.currentTime;
  progress.style.width = `${(currentTime / duration) * 100}%`;

  if (currentTime === duration) {
    pauseVideo();
  }
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = video.duration;
  video.currentTime = (clickX / width) * duration;
}

function functionsPendingUpdate() {
  updateTime();
  updateProgressBar();
}

function updatePlayClasses(element) {
  element.classList.toggle("fa-play");
  element.classList.toggle("fa-pause");
}

function handleAction() {
  const isPlaying = player.classList.contains("play");
  if (isPlaying) {
    pauseVideo();
  } else {
    playVideo();
  }
}

function resetVideo() {
  if (player.classList.contains("play")) {
    pauseVideo();
  }
  video.currentTime = 0;
  functionsPendingUpdate();
}

function getSpeed(speed) {
  return {
    "0.25": 0.25,
    "0.50": 0.50,
    "0.75": 0.75,
    "1.00": 1.0,
    "1.25": 1.25,
    "1.50": 1.5,
    "1.75": 1.75,
    "2.00": 2.0,
  }[speed];
}

function changeSpeed(event) {
  const selectedValue = event.target.value;
  video.playbackRate = getSpeed(selectedValue);
}

selectVideoSpeed.addEventListener("change", changeSpeed);
progressBar.addEventListener("click", setProgress);
resetBtn.addEventListener("click", resetVideo);
playBtn.addEventListener("click", handleAction);
video.addEventListener("click", handleAction);
