let SignIn = document.getElementById("SignIn");
SignIn.addEventListener("click", function () {
  window.location = "index.html";
});
// ---------------------------- inputs tag nafso ---------------------------------------
let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");
let alertp = document.getElementById("alertp");
let inputs = Array.from(document.getElementsByClassName("form-control"));
let signUp = document.getElementById("SignUp");

let users = [];
inputs.forEach((el) => {
  el.addEventListener("focus", () => {
    alertp.innerHTML = "";
  });
});
// -------------------------------  START validation  ---------------------------------
// -------------------- NAME -------------------------
let nameAlert = document.getElementById("nameAlert");
let rejexName = /^[a-zA-Z]{3,9}(?:\s[a-zA-Z]{3,9})*$/;
// ---------------------------------------------------
// -------------------- EMAIL -------------------------
let emailAlert = document.getElementById("emailAlert");
let rejexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// ---------------------------------------------------
// -------------------- Pass ------------------------
let passAlert = document.getElementById("passAlert");
let regexPass = /[A-Za-z1-9.]{4,15}/;
// ---------------------------------------------------

function validateuser(rejex, input, alert) {
  if (rejex.test(input.value)) {
    //valide
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    signUp.removeAttribute("disabled");
    alert.classList.add("d-none");
    validation();
  } else {
    //not valide
    input.classList.add("is-invalid");
    signUp.disabled = "true";
    alert.classList.remove("d-none");
  }
}
function validation() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      signUp.disabled = "true";
    } else {
      if (
        rejexName.test(userName.value) &&
        rejexEmail.test(userEmail.value) &&
        regexPass.test(userPassword.value)
      ) {
        signUp.removeAttribute("disabled");
      } else {
        signUp.disabled = "true";
      }
    }
  }
}
userName.onkeyup = function () {
  validateuser(rejexName, userName, nameAlert);
};
userEmail.onkeyup = function () {
  validateuser(rejexEmail, userEmail, emailAlert);
};
userPassword.onkeyup = function () {
  validateuser(regexPass, userPassword, passAlert);
};

//---> get data
if (JSON.parse(localStorage.getItem("accountslist")) != null) {
  users = JSON.parse(localStorage.getItem("accountslist"));
}
// ---------------------------------------------------

// -------------------------------  START CREATE  Account  -----------------------------

signUp.addEventListener("click", function () {
  // validation
  // let isNameValid = rejexName.test(userName.value);
  // let isEmailValid = rejexEmail.test(userEmail.value);
  // let isPasswordValid = regexPass.test(userPassword.value);

  // ----------
  // new user push user localstorge
  addUser();
  // ------------------------------
  // clear
  clearForm();
  validation();
});
// -------------------   ADD Account DATA   ----------------------
function addUser() {
  let isNameValid = rejexName.test(userName.value);
  let isEmailValid = rejexEmail.test(userEmail.value);
  let isPasswordValid = regexPass.test(userPassword.value);

  if (isNameValid && isEmailValid && isPasswordValid) {
    let isEmailUnique = users.every(
      (user) => user.email.toLowerCase() !== userEmail.value.toLowerCase()
    );
    if (isEmailUnique) {
      let user = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
      };
      users.push(user);
      //---> set data
      localStorage.setItem("accountslist", JSON.stringify(users));
      alertp.innerHTML = "sucsess";
      alertp.classList.remove("alertp");
      alertp.classList.add("alertpsucsess");
      alertp.classList.remove("alertpdanger");
    } else {
      userEmail.classList.add("is-invalid");
      alertp.innerHTML = " this email already exist";
      alertp.classList.remove("alertp");
      alertp.classList.add("alertpdanger");
    }
  } else {
    // Add the is-invalid class
    userName.classList.add("is-invalid");
    userEmail.classList.add("is-invalid");
    userPassword.classList.add("is-invalid");
  }
  console.log(users);
}
// ------------------     CLEAR FORM VALUE   ----------------------
function clearForm() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("is-valid");
  }
}
// -------------------------------  END CREATE Account  -------------------------------
