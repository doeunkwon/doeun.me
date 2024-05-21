function checkMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
  
    if (mode == 'player') {
      document.body.classList.add("player-mode");
    }
  }
  
  checkMode()