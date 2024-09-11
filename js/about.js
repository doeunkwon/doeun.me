document.querySelectorAll(".collapsible-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const collapsibleContent = button.nextElementSibling;
    collapsibleContent.style.display =
      collapsibleContent.style.display === "none" ? "block" : "none";
    button.textContent = button.textContent === "+" ? "-" : "+";
  });
});

const birthDate = new Date("2001-04-12");

function getAgeInComponents() {
  const today = new Date();
  const diffInMs = today.getTime() - birthDate.getTime();

  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);   


  return { days, hours, minutes, seconds };
}

function updateAgeDisplay(ageComponents) {
  const ageElement = document.getElementById("age-display");
  if (ageElement) {
    ageElement.textContent = `${ageComponents.days} days, ${ageComponents.hours} hours, ${ageComponents.minutes} minutes, and ${ageComponents.seconds} seconds`;
  }
}

const initialAgeComponents = getAgeInComponents();

updateAgeDisplay(initialAgeComponents);

function updateAgeLoop() {
  const currentAgeComponents = getAgeInComponents();
  updateAgeDisplay(currentAgeComponents);
  requestAnimationFrame(updateAgeLoop);
}

requestAnimationFrame(updateAgeLoop);