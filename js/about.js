document.querySelectorAll(".collapsible-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const collapsibleContent = button.nextElementSibling;
    collapsibleContent.style.display =
      collapsibleContent.style.display === "none" ? "block" : "none";
    button.textContent = button.textContent === "+" ? "-" : "+";
  });
});
