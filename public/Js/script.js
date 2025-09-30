
// ---------------------------------------- Bootstrap Validagtion form Logic -----------------------------------------
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()





// ----------------------------------------------------Login Form& Sign Up form password JS --------------------------------------------



// // Find the toggle icon element
// const toggleIcon = document.getElementById("password-toggle-icon");

// if (toggleIcon) {
//   const passwordField = document.getElementById("password");
//   toggleIcon.addEventListener("click", function () {
//     const type =
//       passwordField.getAttribute("type") === "password" ? "text" : "password";
//     passwordField.setAttribute("type", type);

//     // Toggle the eye icon
//     const icon = this.querySelector("i");
//     icon.classList.toggle("fa-eye");
//     icon.classList.toggle("fa-eye-slash");
//   });
// }



