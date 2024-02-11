var playlist = [
  "assets/music/Alessandro Pierozzi -- World Of Sound.mp3",
  "assets/music/Maur -- Deep Inside.mp3",
  "assets/music/Tinlicker -- Breezeblocks - Tinlicker Remix.mp3",
  "assets/music/Cosmic Gate, Diana Miro -- Hear Me Out.mp3",
  "assets/music/INZO -- Overthinker.mp3",
  "assets/music/Tinlicker -- Lost Gravity.mp3",
  "assets/music/Tiesto -- Secrets.mp3",
  "assets/music/Airbase -- Escape - Radio Edit.mp3",
  "assets/music/Tinlicker -- Lost - Edit.mp3",
  "assets/music/Calvin Harris, Ellie Goulding -- Miracle (with Ellie Goulding).mp3",
  "assets/music/Tinlicker -- Hide U - Tinlicker Remix.mp3",
  "assets/music/Tinlicker -- Fractal.mp3",
  "assets/music/Fred again -- Bleu (better with time).mp3",
  "assets/music/Tinlicker -- Close Your Eyes.mp3",
  "assets/music/Fejka, Marie Angerer -- Infinity (feat. Marie Angerer).mp3",
  "assets/music/Fred again -- Kammy (like i do).mp3",
  "assets/music/Gareth Emery -- Friendly Fires.mp3",
  "assets/music/INZO -- Drift Like A Cloud, Flow Like Water.mp3",
  "assets/music/Kudus, Mirjam Tumaini -- Never Be Alone.mp3",
  "assets/music/Tinlicker -- Children.mp3",
  "assets/music/Robert Miles, Jaques Le Noir -- Princess Of Light - Jaques Le Noir Edit Remix.mp3",
  "assets/music/RSCL, Repiet, Julia Klejin -- Echo.mp3",
  "assets/music/Stevie Krash, Al Sharif -- The Way (ABGT471).mp3",
  "assets/music/Tiesto -- Drifting.mp3",
  "assets/music/Julian Calor -- One.mp3",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

playlist = shuffleArray(playlist);

let currentTrack = 0;
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const controlElements = [
  "artistName",
  "prevButton",
  "playButton",
  "nextButton",
  "trackTitle",
  "navbar",
].map((id) => document.getElementById(id));

audioPlayer.volume = 0.2;

const updateUI = (trackIndex) => {
  const trackDetails = playlist[trackIndex].split("/")[2];
  const [artistName, trackTitle] = trackDetails
    .split(" -- ")
    .map((part) => part.split(".mp3")[0]);

  document.getElementById("artistName").textContent = artistName;
  document.getElementById("trackTitle").textContent = trackTitle;
};

const changeTrack = (trackIndex) => {
  audioPlayer.src = playlist[trackIndex];
  audioPlayer.play();
  playButton.src = "assets/images/pause.png";
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
    playButton.src = "assets/images/pause.png";
  } else {
    audioPlayer.pause();
    playButton.src = "assets/images/play.png";
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
