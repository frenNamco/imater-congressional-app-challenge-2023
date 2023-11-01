//All HTML elements needed for the page to work
const textboxes = document.getElementsByClassName("textbox");
const button = document.getElementById("login-button");
const emailTextbox = textboxes[0];
const passwordTextbox = textboxes[1];

//Get the data from the teacher.json file
let teacherJSON; 
fetch('../data/teacher.json').then(response => response.json()).then(data => {
    teacherJSON = data;
}).catch(error => {
    console.error('Error:', error);
})

//Adds functionaliy to the login button on click
button.addEventListener("click", () => {
    let inputEmail = emailTextbox.value;
    let inputpassword = passwordTextbox.value;
    let emailInvalid = true;
    let passwordInvalid = true;
    let index = -1;
    let password;

    //Iterates through every teacher object in the teacherJSON
    for (let i = 0; i < teacherJSON.teachers.length; i++) {
        const email = teacherJSON.teachers[i].email;
      
        if (email === inputEmail) {
            /*
            * If an email from the teacher JSON matches the input email
            * then save the index for that teacher, set the email as not invalid,
            * and save the password attached to that teacher object
            */
            index = i;
            emailInvalid = false;
            password = teacherJSON.teachers[index].pass;
            break;
        }
    }

        
    if (password === inputpassword) {
        /*
        * If the inputted password matches a saved password on the JSON
        * then 
        */
        passwordInvalid = false;
    }

    if (!(emailInvalid || passwordInvalid)){
        /*
        * If neither email is invalid
        * enter the pass management page (pass-management.html)
        * and set the teacher the email and password belongs to
        * as the active teacher by using their index in the passes array
        */
        window.location.href = "pass management/pass-management.html";

        const teacherIndex = index.toString();

        localStorage.setItem('active', teacherIndex);

    } else {
        /*
        * If either email or password is invalid
        * then alert the user that either one is invalid
        * clear the text for both textboxes
        * and set their border to a red color
        */
        alert("Invalid email or password");
        emailTextbox.value = "";
        emailTextbox.style.border = '1px solid red';

        passwordTextbox.value = "";
        passwordTextbox.style.border = '1px solid red';
    }
})

