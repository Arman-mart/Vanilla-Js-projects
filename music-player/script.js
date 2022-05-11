const prevBtn = document.querySelector(".backward");
const nextBtn = document.querySelector(".forward");
const pauseBtn = document.querySelector(".pause");
const songTitle = document.querySelector(".song-title");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const app = document.querySelector(".app");
const changeTheme = document.querySelector(".change-theme");
const songs = document.querySelector(".playlist");
const playListBtn = document.querySelector(".playlist-btn");

const playList = ["Ukulele", "Violin", "Guitar"];
let songIndex = 0;

function loadSong(song) {
  songTitle.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

loadSong(playList[songIndex]);

pauseBtn.addEventListener("click", getClickActionFuntion());

function playSong() {
  app.classList.add("play");
  pauseBtn.querySelector("i.fas").classList.remove("fa-play");
  pauseBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
  return setInterval(updateProgressBar, 300);
}

function pauseSong(intId) {
  app.classList.remove("play");
  pauseBtn.querySelector("i.fas").classList.remove("fa-pause");
  pauseBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
  clearInterval(intId);
}

function updateProgressBar() {
  const duration = audio.duration;
  const curTime = audio.currentTime;
  progress.style.width = `${(curTime / duration) * 100}%`;

  if (curTime === duration) {
    goNext();
  }
}

function getClickActionFuntion() {
  let intervalIndex;
  return () => {
    const isPlaying = app.classList.contains("play");

    if (isPlaying) {
      pauseSong(intervalIndex);
    } else {
      intervalIndex = playSong();
    }
  };
}

function goNext() {
  songIndex++;
  if (songIndex > playList.length - 1) {
    songIndex = 0;
  }
  loadSong(playList[songIndex]);
  playSong();
}

function goPrev() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = playList.length - 1;
  }
  loadSong(playList[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressBar.addEventListener("click", setProgress);

if (!localStorage.theme) localStorage.theme = "";
document.body.className = localStorage.theme;

function switchTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.theme = document.body.className || "";
  changeTheme.querySelector("i.fas").classList.toggle("fa-moon");
  changeTheme.querySelector("i.fas").classList.toggle("fa-sun");
}

changeTheme.addEventListener("click", switchTheme);

function createPlaylistOfSongs(playlist) {
  playlist.forEach((element) => {
    const item = document.createElement("li");
    item.innerHTML = `${element}`;
    songs.querySelector("ol").appendChild(item);
  });
}

createPlaylistOfSongs(playList);

songs.querySelector("ol").addEventListener("click", (song) => {
  const selectedSong = song.target.innerText;
  loadSong(playList[playList.indexOf(selectedSong)]);
  playSong();
});

playListBtn.addEventListener("click", () => {
  songs.classList.toggle("playlist-show");
});
