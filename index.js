var playlist = [
  "assets/playlist/Alessandro Pierozzi - World Of Sound.mp3",
  "assets/playlist/Maur - Deep Inside.mp3",
  "assets/playlist/Tinlicker - Breezeblocks - Tinlicker Remix.mp3",
  "assets/playlist/Cosmic Gate, Diana Miro - Hear Me Out.mp3",
  "assets/playlist/INZO - Overthinker.mp3",
  "assets/playlist/Tinlicker - Lost Gravity.mp3",
  "assets/playlist/Tiesto - Secrets.mp3",
  "assets/playlist/Airbase - Escape - Radio Edit.mp3",
  "assets/playlist/Tinlicker - Lost - Edit.mp3",
  "assets/playlist/Andrew Royal, Robbie Seed, Jimmy Chou, That Girl - I Wish.mp3",
  "assets/playlist/Calvin Harris, Ellie Goulding - Miracle (with Ellie Goulding).mp3",
  "assets/playlist/Tinlicker - Hide U - Tinlicker Remix.mp3",
  "assets/playlist/Tinlicker - Fractal.mp3",
  "assets/playlist/Fred again - Bleu (better with time).mp3",
  "assets/playlist/Tinlicker - Close Your Eyes.mp3",
  "assets/playlist/Fejka, Marie Angerer - Infinity (feat. Marie Angerer).mp3",
  "assets/playlist/Fred again - Kammy (like i do).mp3",
  "assets/playlist/Gareth Emery- Friendly Fires.mp3",
  "assets/playlist/INZO - Drift Like A Cloud, Flow Like Water.mp3",
  "assets/playlist/Kudus, Mirjam Tumaini - Never Be Alone.mp3",
  "assets/playlist/Tinlicker - Children.mp3",
  "assets/playlist/Robert Miles, Jaques Le Noir - Princess Of Light - Jaques Le Noir Edit Remix.mp3",
  "assets/playlist/RSCL, Repiet, Julia Klejin - Echo.mp3",
  "assets/playlist/Stevie Krash, Al Sharif - The Way (ABGT471).mp3",
  "assets/playlist/Tiesto - Drifting.mp3",
];
var currentTrack = 0;
var audioPlayer = document.getElementById("audioPlayer");
var playButton = document.getElementById("playButton");
var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");
audioPlayer.volume = 0.2;

function changeTrack(trackIndex) {
  audioPlayer.src = playlist[trackIndex];
  audioPlayer.play();
  playButton.src = "assets/images/pause.png";
}

playButton.addEventListener("click", function () {
  if (audioPlayer.paused) {
    if (audioPlayer.src === "") {
      changeTrack(currentTrack);
    } else {
      audioPlayer.play();
      playButton.src = "assets/images/pause.png";
    }
  } else {
    audioPlayer.pause();
    playButton.src = "assets/images/play.png";
  }
});

audioPlayer.addEventListener("ended", function () {
  currentTrack = (currentTrack + 1) % playlist.length;
  changeTrack(currentTrack);
});

// Skip to the next track
nextButton.addEventListener("click", function () {
  currentTrack = (currentTrack + 1) % playlist.length;
  changeTrack(currentTrack);
});

// Go to the previous track
prevButton.addEventListener("click", function () {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  changeTrack(currentTrack);
});
