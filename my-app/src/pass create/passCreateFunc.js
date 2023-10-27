const iDTextbox = document.getElementById("inputIDText");
const iDButton = document.getElementById("inputIDButton");
const nameText = document.getElementById("student-name");
const passCreatorDiv = document.getElementById("pass-creator");
const destinationDropdown = document.getElementById("destination-dropdown");
const specDestinationDropdown = document.getElementById("specific-destination-dropdown");
const passButton = document.getElementById("create-pass-button");

const passLocation = parseInt(localStorage.getItem("location"));

let studentsJSON; 
fetch('../data/students.json').then(response => response.json()).then(data => {
    studentsJSON = data;
}).catch(error => {
    console.error('Error:', error);
})

let destinationsJSON;
fetch('../data/destinations.json').then(response => response.json()).then(data => {
    destinationsJSON = data;
}).catch(error => {
    console.error('Error', error);
})

iDButton.addEventListener("click", () => {
    const inputID = iDTextbox.value;
    const studentsList = studentsJSON.students;

    let currentStudentName;
    let currentStudentID;
    for (let i = 0; i < studentsList.length; i++) {

        if (inputID === studentsList[i].id) {
            currentStudentName = studentsList[i].name;
            currentStudentID = studentsList[i].id;

            passCreatorDiv.style.display = "flex";
            nameText.textContent = "Pass for: " + currentStudentName;

            fillDropdown();
            
            break;
        }
        else {
            alert("Invalid ID");
            break;
        }
    }
})



function fillDropdown() {
    for (let i = 0; i < destinationsJSON.destinations.length; i++) {
        let option = document.createElement("option");
        option.text = Object.keys(destinationsJSON.destinations[i]);  
        option.value = "Location" + (i + 1);

        
        destinationDropdown.add(option);
    }
}



