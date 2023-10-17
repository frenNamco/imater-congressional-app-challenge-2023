textboxes = document.getElementsByClassName("textbox");
button = document.getElementById("login-button");

emails = ["fake4625@gmail.com", "jlope@imater.org", "test@test.com"];
passwords = ["littlebabyman", "ballsman", "test"];

button.addEventListener("click", () => {
    let inputEmail = textboxes[0].value;
    let inputPass = textboxes[1].value;
    let emailInvalid = false;
    let passInvalid = false;
    let emailIndex = 0;
    let passIndex = 0;

    emails.forEach((email, index) => {
        if (email == inputEmail) {
            emailIndex = index;
        } else {
            emailInvalid = true;
        }
    });

    passwords.forEach((password, index) => {
        if (password == inputPass) {
            passIndex = index;
        } else {
            passInvalid = true;
        }
    })

    if ((emailIndex == passIndex) && !(emailInvalid || passInvalid)){
        window.location.href = "https://www.merriam-webster.com/dictionary/victory";
    }
})