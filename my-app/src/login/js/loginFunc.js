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

button.addEventListener("click", () => {
    let inputEmail = emailTextbox.value;
    let inputPass = passwordTextbox.value;
    let emailInvalid = true;
    let passInvalid = true;
    let index = -1;
    let pass;

    for (let i = 0; i < teacherJSON.teachers.length; i++) {
        const email = teacherJSON.teachers[i].email;
      
        if (email === inputEmail) {
            index = i;
            emailInvalid = false;
            pass = teacherJSON.teachers[index].pass;
            break;
        } else {
            emailInvalid = true;
        }
    }

    
    if (pass === inputPass) {
        passInvalid = false;
    } else {
        passInvalid = true;
    }

    console.log(!(emailInvalid || passInvalid));

    if (!(emailInvalid || passInvalid)){
        window.location.href = "pass management/pass-management.html";

        const teacherIndex = index.toString();

        localStorage.setItem('active', teacherIndex);

    } else {
        alert("Invalid email or password");
        emailTextbox.value = "";
        emailTextbox.style.border = '1px solid red';

        passwordTextbox.value = "";
        passwordTextbox.style.border = '1px solid red';
    }
})

