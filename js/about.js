const birthDate = new Date("2001-04-12");

function getDaysSinceBirth() {
  const today = new Date();
  const diffInMs = today.getTime() - birthDate.getTime();
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return days;
}

function updateAgeDisplay(days) {
  const ageElement = document.getElementById("age-display");
  if (ageElement) {
    ageElement.textContent = `${days}`;
  }
}

const initialDays = getDaysSinceBirth();

updateAgeDisplay(initialDays);

function updateAgeLoop() {
  const currentDays = getDaysSinceBirth();
  updateAgeDisplay(currentDays);
  requestAnimationFrame(updateAgeLoop);
}

requestAnimationFrame(updateAgeLoop);