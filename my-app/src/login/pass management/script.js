const welcomeText = document.getElementById("welcome-text");
const roomCodeInput = document.getElementById("room-code-input");
const roomCodeButton = document.getElementById("setRoomCode");

const teacherIndex = parseInt(localStorage.getItem("active"));

let teacherJSON; 
fetch('../../data/teacher.json').then(response => response.json()).then(data => {
    teacherJSON = data;

    const activeTeacher = teacherJSON.teachers[teacherIndex].name;
    welcomeText.textContent = "Welcome " + activeTeacher;
}).catch(error => {
    console.error('Error:', error);
})



