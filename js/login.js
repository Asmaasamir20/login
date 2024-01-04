let signUp = document.getElementById("signUp");
signUp.addEventListener("click", function () {
  window.location = "signup.html";
});

let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");
let alertp = document.getElementById("alertp");
let signIn = document.getElementById("signIn");
//---> get data
let users = JSON.parse(localStorage.getItem("accountslist")) || [];
console.log(users);

// -------------------------------  START validation  ---------------------------------
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
    signIn.removeAttribute("disabled");
    alert.classList.add("d-none");
  } else {
    //not valide
    input.classList.add("is-invalid");
    signIn.disabled = "true";
    alert.classList.remove("d-none");
  }
}
signinEmail.onkeyup = function () {
  validateuser(rejexEmail, signinEmail, emailAlert);
};
signinPassword.onkeyup = function () {
  validateuser(regexPass, signinPassword, passAlert);
};
// -----------------------------

signIn.addEventListener("click", function () {
  let user = isUserExest(signinEmail.value, signinPassword.value);
  if (!user) return;
  localStorage.setItem("user", JSON.stringify(user));
  location.assign("home.html");
});

function isUserExest(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      alertp.innerHTML = "";
      return users[i];
    }
  }
  alertp.innerHTML = "Email or password missmatch";
  return null;
}
