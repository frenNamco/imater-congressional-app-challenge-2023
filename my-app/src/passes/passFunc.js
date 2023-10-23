const roomCodeTextbox = document.getElementById("pass-textbox");
const enterButton = document.getElementById("enter-button");
const teacherText = document.getElementById("teacher-name");

let teacherJSON;
fetch('../../data/teacher.json').then(response => response.json()).then(data => {
    teacherJSON = data;
}).catch(error => {
    console.error('Error:', error);
})

enterButton.addEventListener("click", () => {
    const roomCode = roomCodeTextbox.value;
    const teacherIndex = parseInt(localStorage.getItem(roomCode.toString()));   

    if (isNaN(teacherIndex)) {
        alert("Enter valid room code");
    } else {
        teacherText.style.display = "block";
        teacherText.textContent = teacherJSON.teachers[teacherIndex].name;
    }
})