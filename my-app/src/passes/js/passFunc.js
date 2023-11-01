//All HTML objects required for the page to work
const roomCodeTextbox = document.getElementById("pass-textbox");
const enterButton = document.getElementById("enter-button");
const teacherText = document.getElementById("teacher-name");
const classPasses = document.getElementById("passes");
const classPass1 = document.getElementById("pass-1");
const classPass2 = document.getElementById("pass-2");
const classPass3 = document.getElementById("pass-3");
const classPass4 = document.getElementById("pass-4");
const classPass5 = document.getElementById("pass-5");
const classPass6 = document.getElementById("pass-6");
const passHolders = [classPass1, classPass2, classPass3, classPass4, classPass5, classPass6];
const studentText = document.getElementsByClassName("student-container");

//Initial value for the passes JSON object before entering 
let passesJSON = {};

//Sets any passes that may exist within localStorage
//Updates those passes every 10 milliseconds in order to properly display pass timer
setInterval(insertPasses, 10);

//Accesses data from teacher.JSON file
let teacherJSON;
fetch('../../data/teacher.json').then(response => response.json()).then(data => {
    teacherJSON = data;

    if (localStorage.getItem("setRoom") !== null) {
        /*
        * If there is a room set for display
        * then display that room's passes
        * and information about that teacher
        */
      const roomCode = parseInt(localStorage.getItem("setRoom"));
      const teacherIndex = parseInt(localStorage.getItem(roomCode.toString()));

      localStorage.setItem("activeRoom", roomCode.toString());
      teacherText.style.display = "block";
      classPasses.style.display = "flex";
      teacherText.textContent = teacherJSON.teachers[teacherIndex].name + "'s Class, Room: " + roomCode;
    } else {
        //Keeps these HTML elements hidden if there is no room
        teacherText.style.display = "none";
        classPasses.style.display = "none";
    }

}).catch(error => {
    //Throws an error in the scenario that the JSON isn't read
    console.error('Error:', error);
})

//Adds functionality to the enter button on a click
enterButton.addEventListener("click", () => {
    const roomCode = roomCodeTextbox.value;
    //Gets the teacher index tied to a room code in order retrieve teacher information
    const teacherIndex = parseInt(localStorage.getItem(roomCode.toString()));

    if (isNaN(teacherIndex)) {
        /*
        * If the teacherIndex is null
        * alert the user that the room code entered is invalid
        * (no teacherIndex tied to a room code)
        */
        alert("Enter valid room code");
    } else {
        /*
        * If the room code was valid (teacherIndex is tied to a room code)
        * then display information regarding the teacher that index belongs to
        */
        setInterval(insertPasses, 10);

        localStorage.setItem("setRoom", roomCode.toString()); //Used to show what room's passes were set to display on the page
        localStorage.setItem("activeRoom", roomCode.toString()); //Used in pass creation and display
        teacherText.style.display = "block";
        classPasses.style.display = "flex";
        teacherText.textContent = teacherJSON.teachers[teacherIndex].name + "'s Class, Room: " + roomCode;
    }
})

//Adds functionality to each pass element
classPass1.addEventListener("click", () => {
    const passLocation = 1; //Each button has a unique location in order to know where to place information
    goToPass(passLocation); //Function that decides to what page the button should go
})

classPass2.addEventListener("click", () => {
    const passLocation = 2;
    goToPass(passLocation);
})

classPass3.addEventListener("click", () => {
    const passLocation = 3;
    goToPass(passLocation);
})

classPass4.addEventListener("click", () => {
    const passLocation = 4;
    goToPass(passLocation);
})

classPass5.addEventListener("click", () => {
    const passLocation = 5;
    goToPass(passLocation);
})

classPass6.addEventListener("click", () => {
    const passLocation = 6;
    goToPass(passLocation);
})

//Function that runs in order to show passes
function insertPasses() {
    if (localStorage.getItem("passes") === null) {
        /*
        * If there is no pass information stored in localStorage
        * then all passes display "Create Pass"
        */
        for (let i = 0; i < studentText.length; i++) {
            studentText[i].textContent = "Create Pass";
        }
    } else {
        /*
        * If there is pass information in localStorage
        * then display any available pass information
        * for a given room
        */
       //Gets all pass information from what's stored in localStorage
        passesJSON = JSON.parse(localStorage.getItem("passes"));
        let passesList = passesJSON.passes;

        console.log(JSON.stringify(passesJSON));
        for (let i = 0; i < studentText.length; i++) {
            //Passes display "Create Pass" by default and will only display "Create Pass"
            //if no information is tied to them
            studentText[i].textContent = "Create Pass"; 
        }

        //Iterates through every pass
        for (let i = 0; i < passesList.length; i++) {
            
            /*
            * If a pass has the same room code as the active room
            * then display that pass
            */
            if (parseInt(localStorage.getItem("activeRoom")) === parseInt(passesList[i].roomCode)) {
                let currentPass = passesList[i];
                let currentPassLocation = currentPass.passLocation;
                let passText = studentText[currentPassLocation - 1]; //Uses the passLocation attribute to decide where to display a pass

                let currentTime = Date.now() - currentPass.startTime; //The difference in time used for the pass timer
                const tenMinutesLater = new Date(currentPass.startTime + 10 * 60 * 1000); //Used to decide when to display a pass as overdue

                if (currentTime > (tenMinutesLater - currentPass.startTime)) {
                    /*
                    * If the timer goes over ten minutes
                    * then don't display a timer but display that a pass is due to be checked in
                    */
                    passText.innerHTML = currentPass.name + "<br>" + currentPass.destination + "<br>Overdue";
                } else {
                    /*
                    * If a timer is under ten minutes
                    * then display the timer
                    */
                    passText.innerHTML = currentPass.name + "<br>" + currentPass.destination + "<br>" + formatTime(currentTime);
                }
                
            }

        }
    }   
}

//Decides what page the pass should go to
function goToPass(passLocation) {
    const currentText = studentText[passLocation - 1].textContent;

    localStorage.setItem("location", passLocation.toString());
    localStorage.setItem("lastPage", "../passes/hall-passes.html"); //Used in the next page in order to decide what page to return to

    if (currentText === "Create Pass") {
        /*
        * If a pass displays "Create Pass"
        * then go to te "Create Pass" page (pass-create.html)
        */
        window.location.href = "../../pass create/pass-create.html";
    } else {
        /*
        * If a pass displays anything else
        * Go to the pass view screen
        */
        window.location.href = "../../pass view/pass-view.html";
    }
}

//Used to format the time in a MM:SS:mm format 
function formatTime(ms) {
    const date = new Date(ms);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); //Converts milliseconds to minutes as a string, adds a leading 0
    const seconds = date.getUTCSeconds().toString().padStart(2, '0'); //Converts milliseconds to seconds as a string, adds a leading 0
    const milliseconds = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0'); //Gets milliseconds as a tenth of a second as a string, adds a leading 0
    return `${minutes}:${seconds}:${milliseconds}`; //Returns a formatted time in a MM:SS:mm format
}