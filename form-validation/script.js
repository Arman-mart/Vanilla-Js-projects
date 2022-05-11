const form = document.getElementById("form");
const email = document.getElementById("email");
const userName = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const submitBtn = document.getElementById("submit");



function checkInputs() {
  const usernameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (usernameValue === "" || usernameValue.length < 3) {
    setError(userName, "Username must be at least 3 characters");
  } else {
    setSuccess(userName);
  }

  if (!checkEmail(emailValue)) {
    setError(email, "Email is not valid");
  } else {
    setSuccess(email);
  }

  if (passwordValue < 6) {
    setError(password, "Password must be at least 6 characters");
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === "") {
    setError(confirmPassword, "Password 2 is required");
  } else if (passwordValue !== confirmPasswordValue) {
    setError(confirmPassword, "Passwords does not match");
  } else {
    setSuccess(confirmPassword);
  }
}

function setError(input, message) {
  const formControl = input.parentElement;
  const errorMessageBox = formControl.querySelector("span");
  formControl.className = "form-control error";
  errorMessageBox.innerText = message;
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(email) {
  const emailFilter =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailFilter.test(email);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkInputs();
});