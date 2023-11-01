//All HTML elements required for the page to function
const studentText = document.getElementById("student-text");
const passTimer = document.getElementById("pass-timer");
const checkInButton = document.getElementById("check-in-button");

const activeRoom = parseInt(localStorage.getItem("activeRoom")); //Retrieve the active room from either the hall passes page or the pass management page
const passLocation = parseInt(localStorage.getItem("location")); // Retrieves the location of where the pass needs to get displayed
const passesJSON = JSON.parse(localStorage.getItem("passes")); //Retrieves all pass information from the created passes

let passes = passesJSON.passes; // An array of all passes
let currentPass; // The current pass being displayed
let currentStudent; // The student that the pass belongs to
let currentRoom; //The room code where the pass was created from 
let currentDestination; //The destination for the pass
let passIndex; //The index of the pass in the passes array

//iterates through the entire passes array
for (let i = 0; i < passes.length; i++) {
    let pass = passes[i];

    if ((pass.roomCode == activeRoom) && (pass.passLocation == passLocation)) {
        /*
        * If the current pass has the same room as the active room
        * and if it's location matches the pass location from the prior page
        * then set the pass attribute       
        */
        currentPass = pass;
        currentStudent = pass.name;
        currentRoom = pass.roomCode;
        currentDestination = pass.destination;
        passIndex = i;
    }
}


setInterval(updateScreen, 10); //Updates the screen every 10th of a millisecond

//Function used to update the timer on the page
function updateScreen() {
    let currentTime = Date.now() - currentPass.startTime; //The difference in time used for the pass timer
    const tenMinutesLater = new Date(currentPass.startTime + 10 * 60 * 1000); //Used to decide when to display a pass as overdue

    //Displays all the information from the display 
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