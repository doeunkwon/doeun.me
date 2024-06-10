var playlist = [
  "assets/music/06.09.24 -- BioBloom.mp3",
  "assets/music/06.09.24 -- CHROM-atic_4BERR0R.mp3",
  "assets/music/06.09.24 -- Dreamscape.mp3",
  "assets/music/06.09.24 -- Illusory Eden.mp3"
];

var animations = [
  "assets/images/04-18-18.gif",
  "assets/images/05-12-22.gif",
  "assets/images/05-24-24.gif",
  "assets/images/05-26-23.gif",
]

function shufflePlaylist(playlist) {
  for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]]; // Swap elements
  }
  return playlist;
}

let currentImageIndex = 0;

function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % animations.length;
  document.getElementById("animation").src = animations[currentImageIndex];
}

window.onload = changeImage;

const changeButton = document.getElementById("changeImageButton");
changeButton.addEventListener("click", changeImage);

playlist = shufflePlaylist(playlist);



let currentTrack = 0;
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const controlElements = [
  "trackTitle",
  "prevButton",
  "playButton",
  "nextButton",
  "trackDate",
  "navbar-top",
  "navbar-bottom",
].map((id) => document.getElementById(id));

audioPlayer.volume = 0.2;

const updateUI = (trackIndex) => {
  const trackDetails = playlist[trackIndex].split("/")[2];
  const [trackDate, trackTitle] = trackDetails
    .split(" -- ")
    .map((part) => part.split(".mp3")[0]);

  document.getElementById("trackTitle").textContent = trackTitle;
  document.getElementById("trackDate").textContent = trackDate;
};

const changeTrack = (trackIndex) => {
  audioPlayer.src = playlist[trackIndex];
  audioPlayer.play();
  playButton.src = "assets/images/pause-circle-fill.png";
  updateUI(trackIndex);
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
