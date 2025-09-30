
  const toggleIcon = document.getElementById("password-toggle-icon");

if (toggleIcon) {
  const passwordField = document.getElementById("password");
  toggleIcon.addEventListener("click", function () {
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    // Toggle the eye icon
    const icon = this.querySelector("i");
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
}

