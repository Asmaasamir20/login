let GOToLogin = document.getElementById("GOToLogin");
GOToLogin.addEventListener("click", function () {
  window.location = "index.html";
});

let userInfo = JSON.parse(localStorage.getItem("user"));
let userName = (document.getElementById("userName").innerHTML = userInfo.name);
console.log(userInfo);
