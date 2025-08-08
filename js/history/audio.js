const musicContainer = document.querySelector('.audio__content');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const numberMusic = document.querySelector(".number-song");

const audio = document.getElementById('music');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const totalDuration = document.getElementById("total-duration");
const currentProgress = document.getElementById("current-time");

// Title Song
const audioTitle = document.getElementById("audio-message");
const audioMessage = document.querySelector(".audio__content__message");

// Song Titles
const songs = ['Jurassic Park', 'Magnificent 7', 'Star Wars', 'Star Wars ', 'El Shaddai'];
const typeSong = ['Original', 'Original', 'EpisodeVII - Remix', 'EpisodeVI - Remix', 'Original'];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/audio/${song}.jpg`;
  numberMusic.innerHTML = `<span class="num-1">${songIndex + 1}</span>/<span class="num-total">${songs.length}</span>`;
}

// Show Title Song
function showTitleSong(songTitle, typeSong) {
  audioTitle.innerHTML = ` - ${songTitle} (${typeSong})`;
  audioTitle.classList.add("display");
  setTimeout(() => audioTitle.classList.remove("display"), 500);
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();

  // Show Title Song
  showTitleSong(songs[songIndex], typeSong[songIndex]);
  audioMessage.classList.add("change-color");
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();

  // Stop showing Title Song
  audioTitle.innerText = "";
  audioMessage.classList.remove("change-color");
}

// Previous song
function prevSong() {
  songIndex--;

  if(songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();

  showTitleSong(songs[songIndex], typeSong[songIndex]);
  audioMessage.classList.add("change-color");
}

// Next song
function nextSong() {
  songIndex++;
  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();

  showTitleSong(songs[songIndex], typeSong[songIndex]);
  audioMessage.classList.add("change-color");
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;  

  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if(durationSeconds < 10) durationSeconds = `0${durationSeconds}`;

  // Delay switching duration Element to avoid NaN
  if(durationSeconds) totalDuration.innerHTML = `${durationMinutes}:${durationSeconds}`;

  // Calculate display for currentTime
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if(currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
  currentProgress.textContent = `${currentMinutes}:${currentSeconds}`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if(isPlaying) {
    pauseSong();
  }
  else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);