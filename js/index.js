var playlist = [
  "assets/music/alt-J, Tinlicker -- Breezeblocks - Tinlicker Remix.mp3",
  "assets/music/Airbase -- Escape - Radio Edit.mp3",
  "assets/music/Fred again -- Bleu (better with time).mp3",
  "assets/music/Tinlicker, Belle Doron -- Close Your Eyes.mp3",
  "assets/music/Jóhann Jóhannsson -- Já, Hemmi Minn - From „Dís“ Soundtrack.mp3",
  "assets/music/Jóhann Jóhannsson, Jonas Colstrup -- Unspoken Admiration.mp3",
  "assets/music/Jóhann Jóhannsson, Víkingur Ólafsson -- Flight from the City - Víkingur Ólafsson Rework.mp3",
  "assets/music/Lapalux -- Amnioverse.mp3",
  "assets/music/Tinlicker, Solomon Grey -- Choir To The Wild.mp3",
  "assets/music/Tom Odell -- Sunrise___.mp3",
  "assets/music/Eli & Fur, Marsh -- Wild Skies - Marsh Remix.mp3",
  "assets/music/Jóhann Jóhannsson -- Odi et Amo - bis - Remastered.mp3",
  "assets/music/Porter Robinson -- Get Your Wish.mp3",
  "assets/music/Porter Robinson -- Goodbye To A World.mp3",
  "assets/music/Jóhann Jóhannsson -- Ruslpóstur - From „Dís“ Soundtrack.mp3",
  "assets/music/Jóhann Jóhannsson -- The Sun's Gone Dim and the Sky's Turned Black.mp3",
  "assets/music/Porter Robinson -- Something Comforting.mp3",
  "assets/music/Tom Odell -- ___Sunset.mp3",
  "assets/music/Virtual Self -- Ghost Voices.mp3",
  "assets/music/Virtual Self -- Particle Arts.mp3",
  "assets/music/Jóhann Jóhannsson -- Gúmmískór - From „Dís“ Soundtrack.mp3",
  "assets/music/Virtual Self -- a.i.ngel (Become God).mp3"
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
  "navbar-top",
  "navbar-bottom",
].map((id) => document.getElementById(id));

console.log(audioPlayer);
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
