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


    let targetTeacher = findTeacherByEmail(inputEmail); // find teacher (thinking of expanding this method to include other identifiers for teachers, not just email)
    let pass = targetTeacher.pass;



    if (!targetTeacher || pass !== inputPass)// fail state -- if a teacher is not found OR the pass is invalid
    {
        alert("Invalid email or password");
        emailTextbox.value = "";
        emailTextbox.style.border = '1px solid red';

        passwordTextbox.value = "";
        passwordTextbox.style.border = '1px solid red';
        return; //end function prematurely
    }

    //success state
    window.location.href = "pass management/pass-management.html";
    let teacherID = targetTeacher.id;
    localStorage.setItem('active', teacherID.toString());
})

function findTeacherByEmail(email)
{
    return teacherJSON.teachers.find((e) => (e.email === email)); // returns null..
                                          //[        ^        ]
                                          // if THIS ^ condition is not satisfied
}