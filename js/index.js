var playlist = [
  "assets/music/4_min_samples -- track_1.mp3",
  "assets/music/4_min_samples -- track_2.mp3",
  "assets/music/4_min_samples -- track_3.mp3",
  "assets/music/4_min_samples -- track_4.mp3",
  "assets/music/4_min_samples -- track_5.mp3",
  "assets/music/4_min_samples -- track_6.mp3",
  "assets/music/4_min_samples -- track_7.mp3",
];

let currentTrack = 0;
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const controlElements = [
  "prevButton",
  "playButton",
  "nextButton",
  "navbar-top",
  "navbar-bottom",
].map((id) => document.getElementById(id));

audioPlayer.volume = 0.2;

const changeTrack = (trackIndex) => {
  audioPlayer.src = playlist[trackIndex];
  audioPlayer.play();
  playButton.src = "assets/images/pause-circle-fill.png";
  resetFadeOutControls();
};

const setOpacity = (opacity) => {
  controlElements.forEach((element) => {
    if (element) element.style.opacity = String(opacity);
  });
};

let fadeTimer;
const resetFadeOutControls = () => {
  clearTimeout(fadeTimer);
  setOpacity(1);
  fadeTimer = setTimeout(() => setOpacity(0), 3000);
};

document.addEventListener("mousemove", resetFadeOutControls);

playButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    if (!audioPlayer.src) changeTrack(currentTrack);
    else audioPlayer.play();
    playButton.src = "assets/images/pause-circle-fill.png";
  } else {
    audioPlayer.pause();
    playButton.src = "assets/images/play-circle-fill.png";
  }
  resetFadeOutControls();
});

audioPlayer.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  changeTrack(currentTrack);
});

document.getElementById("nextButton").addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  changeTrack(currentTrack);
});

document.getElementById("prevButton").addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  changeTrack(currentTrack);
});

resetFadeOutControls();
