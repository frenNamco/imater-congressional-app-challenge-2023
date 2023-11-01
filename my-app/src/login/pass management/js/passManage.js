//All HTML elements for this page's functionality
const welcomeText = document.getElementById("welcome-text");
const roomCodeInput = document.getElementById("room-code-input");
const roomCodeButton = document.getElementById("setRoomCode");
const classPasses = document.getElementById("class-passes");
const classPass1 = document.getElementById("pass-1");
const classPass2 = document.getElementById("pass-2");
const classPass3 = document.getElementById("pass-3");
const classPass4 = document.getElementById("pass-4");
const classPass5 = document.getElementById("pass-5");
const classPass6 = document.getElementById("pass-6");
const passHolders = [classPass1, classPass2, classPass3, classPass4, classPass5, classPass6];
const studentText = document.getElementsByClassName("student-container");

//Retrieves the index of the active teacher who just logged in
const teacherIndex = parseInt(localStorage.getItem("active"));

//An empty JSON object to be used later when retrieving pass information
let passesJSON = {};

//Retrieves teacher information from the teacher.JSON file
let teacherJSON; 
let activeTeacher;
fetch('../../data/teacher.json').then(response => response.json()).then(data => {
    teacherJSON = data;

    //Changes the text to include the teacher
    activeTeacher = teacherJSON.teachers[teacherIndex].name;
    welcomeText.textContent = "Welcome " + activeTeacher;

    if (localStorage.getItem(teacherIndex.toString()) !== null) {
        /*
        * If a teacher has a room assigned to them
        * then change the welcome text to include the room
        * that they're in
        */
        welcomeText.textContent = welcomeText.textContent + ", you're in Room " + localStorage.getItem(teacherIndex.toString());
        classPasses.style.display = "flex";
        roomCodeInput.value = localStorage.getItem(teacherIndex.toString());
    
    } else {
        /*
        * If a teacher doesn't have a room assigned to them
        * tell the teacher that they have no room assigned
        * and that they need to set a room
        */
        welcomeText.textContent = welcomeText.textContent + ", please set the room you're in";
    }

    //Runs the insertPasses method every 10th of a second
    setInterval(insertPasses, 10);

}).catch(error => {
    console.error('Error:', error); //Catch any errors while fetching data
})

//Adds functionality to the button that sets room codes
roomCodeButton.addEventListener("click", () => {
    /*
    * When the button is pressed, the value that the teacher set
    * is displayed on the welcome text
    */
    roomCode = roomCodeInput.value;
    classPasses.style.display = "flex";
    welcomeText.textContent = "Welcome " + activeTeacher + ", you're in Room " + roomCode;

    for (let i = 0; i < teacherJSON.teachers.length; i++) {
        if (localStorage.getItem(i.toString()) === roomCode.toString()) {
            localStorage.removeItem(i.toString());
        }
    }

    localStorage.setItem("activeRoom", roomCode.toString()); //The room code is saved for pass creation 
    localStorage.setItem(roomCode.toString(), teacherIndex.toString()); //The teacher index is attached to the room code when retreiving teacher information in the hall passes screen
    localStorage.setItem(teacherIndex.toString(), roomCode.toString()); //The room code is attached to the teacher index for retrieval when the page loads after login
    alert("Room code has been set: " + roomCode + "\n" + 
    "by: " + activeTeacher); // Alerts the teacher that the room was succesfully changed

    setInterval(insertPasses, 10); //Calls insert passses every 10th of a second

})

//Allows each pass object to be able to create new passes or display passes shown
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
            if (parseInt(localStorage.getItem(parseInt(teacherIndex))) === parseInt(passesList[i].roomCode)) {
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
    localStorage.setItem("lastPage", "../login/pass management/pass-management.html"); //Used in the next page in order to decide what page to return to

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