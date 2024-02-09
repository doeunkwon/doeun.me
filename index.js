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
  "assets/playlist/Calvin Harris, Ellie Goulding - Miracle (with Ellie Goulding).mp3",
  "assets/playlist/Tinlicker - Hide U - Tinlicker Remix.mp3",
  "assets/playlist/Tinlicker - Fractal.mp3",
  "assets/playlist/Fred again - Bleu (better with time).mp3",
  "assets/playlist/Tinlicker - Close Your Eyes.mp3",
  "assets/playlist/Fejka, Marie Angerer - Infinity (feat. Marie Angerer).mp3",
  "assets/playlist/Fred again - Kammy (like i do).mp3",
  "assets/playlist/Gareth Emery - Friendly Fires.mp3",
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
var controlElements = [
  document.getElementById("artistName"),
  document.getElementById("prevButton"),
  document.getElementById("playButton"),
  document.getElementById("nextButton"),
  document.getElementById("trackTitle"),
];
audioPlayer.volume = 0.2;

function changeTrack(trackIndex) {
  audioPlayer.src = playlist[trackIndex];
  audioPlayer.play();
  playButton.src = "assets/images/pause.png";

  var trackDetails = playlist[trackIndex].split("/")[2];
  var artistName = trackDetails.split(" - ")[0];
  var trackTitle = trackDetails.split(" - ")[1].split(".mp3")[0];

  document.getElementById("artistName").textContent = artistName;
  document.getElementById("trackTitle").textContent = trackTitle;
  setOpacity(1); // Make controls visible

  // Hide controls after 3 seconds
  clearTimeout(window.fadeTimer);
  window.fadeTimer = setTimeout(function () {
    setOpacity(0);
  }, 3000);
}

function setOpacity(opacity) {
  controlElements.forEach(function (element) {
    element.style.opacity = opacity.toString();
  });
}

document.addEventListener("mousemove", function () {
  setOpacity(1); // Make controls visible on mouse move

  // Reset the timer to hide controls after 3 seconds
  clearTimeout(window.fadeTimer);
  window.fadeTimer = setTimeout(function () {
    setOpacity(0);
  }, 3000);
});

playButton.addEventListener("click", function () {
  if (audioPlayer.paused) {
    if (!audioPlayer.src) {
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

nextButton.addEventListener("click", function () {
  currentTrack = (currentTrack + 1) % playlist.length;
  changeTrack(currentTrack);
});

prevButton.addEventListener("click", function () {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  changeTrack(currentTrack);
});
