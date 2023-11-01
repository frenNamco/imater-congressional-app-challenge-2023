const iDTextbox = document.getElementById("inputIDText");
const iDButton = document.getElementById("inputIDButton");
const nameText = document.getElementById("student-name");
const passCreatorDiv = document.getElementById("pass-creator");
const destinationDropdown = document.getElementById("destination-dropdown");
const specDestinationDropdown = document.getElementById("specific-destination-dropdown");
const passButton = document.getElementById("create-pass-button");
const passContainer = document.getElementById("pass-creator-container");

//Location where the pass will be displayed
const passLocation = parseInt(localStorage.getItem("location"));
const roomCode = parseInt(localStorage.getItem("activeRoom"));
let currentStudentName;
let currentStudentID;

//Retrieve the data from the student.json file
let studentsJSON; 
fetch('../data/students.json').then(response => response.json()).then(data => {
    studentsJSON = data;
}).catch(error => {
    console.error('Error:', error);
})

//Retrieve the data from the destinations.json file
let destinationsJSON;
fetch('../data/destinations.json').then(response => response.json()).then(data => {
    destinationsJSON = data;
}).catch(error => {
    console.error('Error', error);
})

iDButton.addEventListener("click", () => {
    const inputID = iDTextbox.value;
    const studentsList = studentsJSON.students;

    //Check to see if the ID for a student exists
    for (let i = 0; i <= studentsList.length; i++) {

        try {
            if (inputID === studentsList[i].id) {
                //Displays the required fields for creating a pass
                currentStudentName = studentsList[i].name;
                currentStudentID = studentsList[i].id;
    
                passCreatorDiv.style.display = "flex";
                passContainer.classList.toggle("slideFromBottom");    //activates css animation
                nameText.innerHTML = "Pass for: " + currentStudentName + "<br>from: Room " + roomCode;
    
                fillDropdown();
                
                break;
            }
        } catch (error) {
            alert("Invalid ID");
        }
        
        
    }
});

destinationDropdown.addEventListener("click", () => {
    const currentDestination = destinationDropdown.value;

    // Iterate through the "destinations" array
    for (let i = 0; i < destinationsJSON.destinations.length; i++) {
        const destinationObject = destinationsJSON.destinations[i];

        // Check if the currentDestination matches any key in the destinationObject
        if (currentDestination in destinationObject) {
            fillSpecDropdown(currentDestination);
            break;
        }
    }
});

passButton.addEventListener("click", () => {
    if (destinationDropdown.value === "" || specDestinationDropdown.value === "") {
        alert("Please select a destination");
    } else {
        const currentSpecDestination = specDestinationDropdown.value;
        let passesJSON = {
            "passes": []
        };
    
        const storedPasses = localStorage.getItem("passes");
    
        if (storedPasses !== null) {
            try {
                const parsedPasses = JSON.parse(storedPasses);
                if (Array.isArray(parsedPasses.passes)) {
                    passesJSON = parsedPasses;
                }
            } catch (error) {
                console.error("Error parsing stored passes:", error);
            }
        }
    
        console.log("Before adding a new pass:", passesJSON);
    
        const newPass = {
            "roomCode": roomCode,
            "destination": currentSpecDestination,
            "name": currentStudentName,
            "studentID": currentStudentID,
            "startTime": Date.now(),
            "passLocation": passLocation
        };
    
        passesJSON.passes.push(newPass);
    
        console.log("After adding a new pass:", passesJSON);
    
        localStorage.setItem("passes", JSON.stringify(passesJSON));
        window.location.href = localStorage.getItem("lastPage");
    } 
});


//Fills the dropdown that displays location groups
function fillDropdown() {
    destinationDropdown.innerHTML = '<option value="" disabled selected>Select a destination</option>';

    for (let i = 0; i < destinationsJSON.destinations.length; i++) {
        let option = document.createElement("option");
        option.text = Object.keys(destinationsJSON.destinations[i]);  
        option.value = Object.keys(destinationsJSON.destinations[i]);

        
        destinationDropdown.add(option);
    }
}

//Fills the dropdown for specific locations
function fillSpecDropdown(currentDestination) {
    // Find the destination object corresponding to the selected destination
    const destinationObject = destinationsJSON.destinations.find(dest => dest[currentDestination]);

    // Get the array of locations if the destination object is found
    const locationsArray = destinationObject ? destinationObject[currentDestination] : [];

    // Clear the specDestinationDropdown before adding new options
    specDestinationDropdown.innerHTML = '<option value="" disabled selected>Select a destination</option>';

    // Add options based on the locationsArray
    locationsArray.forEach((location, index) => {
        let option = document.createElement("option");
        option.text = location.location;
        option.value = location.location;

        specDestinationDropdown.add(option);
    });
}







