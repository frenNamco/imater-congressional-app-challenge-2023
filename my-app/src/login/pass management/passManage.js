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
const studentPassContainer = document.getElementsByClassName("student-pass-container");
const studentText = document.getElementsByClassName(
    "student-container");

const teacherIndex = parseInt(localStorage.getItem("active"));

let passes = {};

if (localStorage.getItem("passes") === null) {
    for (let i = 0; i < studentText.length; i++) {
        studentText[i].textContent = "Create Pass";
    }
} else {
    passes = parseJSON(localStorage.getItem("passes"));
}

let teacherJSON; 
fetch('../../data/teacher.json').then(response => response.json()).then(data => {
    teacherJSON = data;

    const activeTeacher = teacherJSON.teachers[teacherIndex].name;
    welcomeText.textContent = "Welcome " + activeTeacher;
}).catch(error => {
    console.error('Error:', error);
})

roomCodeButton.addEventListener("click", () => {
    roomCode = roomCodeInput.value;
    classPasses.style.display = "flex";
    
    localStorage.setItem(roomCode.toString(), teacherIndex.toString());
    alert("Room code has been set: " + roomCode + "\n" + 
    "by: " + teacherJSON.teachers[teacherIndex].name);
})

classPass1.addEventListener("click", () => {
    const passLocation = 1;

    localStorage.setItem("location", passLocation.toString());
    window.location.href = "../../pass create/pass-create.html";

})
