//This should be working but I can't tell so please fix it
const startButton = document.getElementbyId("start-button");
const loadingScreen = document.getElementById("loading-screen");

startButton.addEventListener("click", () => {
  loadingScreen.classList.toggle("active");
});
