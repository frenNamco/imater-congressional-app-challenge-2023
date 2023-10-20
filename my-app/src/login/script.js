const textboxes = document.getElementsByClassName("textbox");
const button = document.getElementById("login-button");

const emailTextbox = textboxes[0];
const passwordTextbox = textboxes[1];

const emails = ["fake4625@gmail.com", "jlope@imater.org", "test@test.com"];
const passwords = ["littlebabyman", "ballsman", "test"];

button.addEventListener("click", () => {
    let inputEmail = emailTextbox.value;
    let inputPass = passwordTextbox.value;
    let emailInvalid = true;
    let passInvalid = true;
    let emailIndex = -1;
    let passIndex = -1;

    for (let i = 0; i < emails.length; i++) {
        const email = emails[i];
      
        if (email === inputEmail) {
            emailIndex = i;
            emailInvalid = false;
            break;
        } else {
            emailInvalid = true;
        }
    }

    for (let i = 0; i < passwords.length; i++) {
        const password = passwords[i];
      
        if (password === inputPass) {
            passIndex = i;
            passInvalid = false;
            break;
        } else {
            passInvalid = true;
        }
    }

    if ((emailIndex == passIndex) && !(emailInvalid || passInvalid)){
        window.location.href = "https://www.merriam-webster.com/dictionary/victory";

    } else {
        emailTextbox.value = "";
        emailTextbox.style.border = '1px solid red';

        passwordTextbox.value = "";
        passwordTextbox.style.border = '1px solid red';
    }
})