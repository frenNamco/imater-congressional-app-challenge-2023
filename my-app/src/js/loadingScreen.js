const startButton = document.querySelector(".start-button");
const loadingScreen = document.getElementById("loading-screen");

startButton.addEventListener("click", () => {
  loadingScreen.classList.toggle("active");
});
