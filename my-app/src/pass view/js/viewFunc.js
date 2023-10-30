const studentText = document.getElementById("student-text");
const passTimer = document.getElementById("pass-timer");
const checkInButton = document.getElementById("check-in-button");

const activeRoom = parseInt(localStorage.getItem("activeRoom"));
const passLocation = parseInt(localStorage.getItem("location"));
const passesJSON = JSON.parse(localStorage.getItem("passes"));

let passes = passesJSON.passes;
let currentPass;
let currentStudent;
let currentRoom;
let currentDestination;
let passIndex;

for (let i = 0; i < passes.length; i++) {
    let pass = passes[i];

    if ((pass.roomCode == activeRoom) && (pass.passLocation == passLocation)) {
        currentPass = pass;
        currentStudent = pass.name;
        currentRoom = pass.roomCode;
        currentDestination = pass.destination;
        passIndex = i;
    }
}

setInterval(updateScreen, 10);

function updateScreen() {
    let currentTime = Date.now() - currentPass.startTime;
    const tenMinutesLater = new Date(currentPass.startTime + 10 * 60 * 1000);

    studentText.innerHTML = "Pass for: " + currentStudent + "<br><br>From: Room " + currentRoom + "<br><br> to: " + currentDestination;

    if (currentTime > (tenMinutesLater - currentPass.startTime)) {
        passTimer.innerHTML = formatTime(currentTime) + "<br>Overdue";
    } else {
        passTimer.innerHTML = formatTime(currentTime);
    }
}


checkInButton.addEventListener("click", () => {
    passesJSON.passes.splice(passIndex, 1);
    localStorage.setItem("passes", JSON.stringify(passesJSON));

    window.location.href = localStorage.getItem("lastPage");
})


function formatTime(ms) {
    const date = new Date(ms);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}