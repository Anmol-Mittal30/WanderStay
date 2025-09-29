 const passwordField = document.getElementById("password");
  const toggleIcon = document.getElementById("password-toggle-icon");
  toggleIcon.addEventListener("click", function () {
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });




