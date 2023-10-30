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

let passesJSON = {};

setInterval(insertPasses, 10);

let teacherJSON;
fetch('../../data/teacher.json').then(response => response.json()).then(data => {
    teacherJSON = data;

    if (localStorage.getItem("setRoom") !== null) {
      const roomCode = parseInt(localStorage.getItem("setRoom"));
      const teacherIndex = parseInt(localStorage.getItem(roomCode.toString()));

      localStorage.setItem("activeRoom", roomCode.toString());
      teacherText.style.display = "block";
      classPasses.style.display = "flex";
      teacherText.textContent = teacherJSON.teachers[teacherIndex].name + "'s Class, Room: " + roomCode;
    } else {
        teacherText.style.display = "none";
        classPasses.style.display = "none";
    }

}).catch(error => {
    console.error('Error:', error);
})

enterButton.addEventListener("click", () => {
    const roomCode = roomCodeTextbox.value;
    const teacherIndex = parseInt(localStorage.getItem(roomCode.toString()));   

    if (isNaN(teacherIndex)) {
        alert("Enter valid room code");
    } else {
        setInterval(insertPasses, 10);

        localStorage.setItem("setRoom", roomCode.toString());
        localStorage.setItem("activeRoom", roomCode.toString());
        teacherText.style.display = "block";
        classPasses.style.display = "flex";
        teacherText.textContent = teacherJSON.teachers[teacherIndex].name + "'s Class, Room: " + roomCode;
    }
})

classPass1.addEventListener("click", () => {
    const passLocation = 1;
    goToPass(passLocation);
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

function insertPasses() {
    if (localStorage.getItem("passes") === null) {
        for (let i = 0; i < studentText.length; i++) {
            studentText[i].textContent = "Create Pass";
        }
    } else {
        passesJSON = JSON.parse(localStorage.getItem("passes"));
        let passesList = passesJSON.passes;

        console.log(JSON.stringify(passesJSON));
        for (let i = 0; i < studentText.length; i++) {
            studentText[i].textContent = "Create Pass";
        }

        for (let i = 0; i < passesList.length; i++) {
            
            if (parseInt(localStorage.getItem("activeRoom")) === parseInt(passesList[i].roomCode)) {
                let currentPass = passesList[i];
                let currentPassLocation = currentPass.passLocation;
                let passText = studentText[currentPassLocation - 1];

                let currentTime = Date.now() - currentPass.startTime;
                const tenMinutesLater = new Date(currentPass.startTime + 10 * 60 * 1000);

                if (currentTime > (tenMinutesLater - currentPass.startTime)) {
                    passText.innerHTML = currentPass.name + "<br>" + currentPass.destination + "<br>Overdue";
                } else {
                    passText.innerHTML = currentPass.name + "<br>" + currentPass.destination + "<br>" + formatTime(currentTime);
                }
                
            }

        }
    }   
}

function goToPass(passLocation) {
    const currentText = studentText[passLocation - 1].textContent;

    localStorage.setItem("location", passLocation.toString());
    localStorage.setItem("lastPage", "../passes/hall-passes.html");

    
    if (currentText === "Create Pass") {
        window.location.href = "../../pass create/pass-create.html";
    } else {
        window.location.href = "../../pass view/pass-view.html";
    }
}

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}