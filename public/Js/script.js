window.addEventListener("DOMContentLoaded", handleDeleteForms);


function handleDeleteForms() {
    const forms = document.querySelectorAll('.delete-form');
    forms.forEach(form => {
        form.addEventListener("submit", Confirm);
    })
}
function Confirm(e) {
    const confirmed = confirm("Are you sure you want to delete this listing?");
    if (!confirmed) e.preventDefault();
}

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

const passwordField = document.getElementById("password");
  const toggleIcon = document.getElementById("password-toggle-icon");
  toggleIcon.addEventListener("click", function () {
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });

//   --------------------------------------------------- INdex.ejs  Js --------------------------------------------------------
//  const scrollRightBtn = document.getElementById("scroll-right");
//   const scrollArea = document.getElementById("filters-scroll-area");

//   // Function to check if right button should be visible (left button removed)
//   const checkScroll = () => {
//     const atEnd =
//       scrollArea.scrollWidth - scrollArea.clientWidth <=
//       scrollArea.scrollLeft + 1;
//     scrollRightBtn.classList.toggle("hidden", atEnd);
//   };

//   // Event listener for the right button
//   scrollRightBtn.addEventListener("click", () => {
//     scrollArea.scrollLeft += 350; // Scroll right by 350 pixels
//   });

//   // Check scroll position whenever it changes
//   scrollArea.addEventListener("scroll", checkScroll);

//   // Initial check when the page loads
//   window.addEventListener("load", checkScroll);
//   window.addEventListener("resize", checkScroll); // Also check on resize

//   // Your existing tax toggle script
//   let taxSwitch = document.getElementById("switchCheckDefault");
//   taxSwitch.addEventListener("click", () => {
//     let taxInfo = document.getElementsByClassName("tax-info");
//     for (let info of taxInfo) {
//       info.style.display = info.style.display !== "inline" ? "inline" : "none";
//     }
//   });



 // --- Logic for Filter Scroll Buttons ---
  const scrollRightBtn = document.getElementById("scroll-right");
  const scrollArea = document.getElementById("filters-scroll-area");

  if (scrollRightBtn && scrollArea) {
    // Function to check if the button should be visible
    const checkScroll = () => {
      // Check if we are at the end of the scrollable area
      const atEnd = scrollArea.scrollWidth - scrollArea.clientWidth <= scrollArea.scrollLeft + 1;
      // Add a 'hidden' class to the button if at the end
      scrollRightBtn.classList.toggle("hidden", atEnd);
    };

    // Event listener for the right button
    scrollRightBtn.addEventListener("click", () => {
      scrollArea.scrollLeft += 350; // Scroll right by 350 pixels
    });

    // Check scroll position whenever it changes
    scrollArea.addEventListener("scroll", checkScroll);

    // Initial check when the page loads and on resize
    window.addEventListener("load", checkScroll);
    window.addEventListener("resize", checkScroll);
  }

  // --- Logic for Tax Toggle Switch ---
  const taxSwitch = document.getElementById("switchCheckDefault");
  if (taxSwitch) {
    taxSwitch.addEventListener("click", () => {
      // Get all elements with the class 'tax-info'
      let taxInfoElements = document.getElementsByClassName("tax-info");
      // Loop through each tax element and toggle its display
      for (let info of taxInfoElements) {
        // This is a cleaner way to toggle between two states
        info.style.display = taxSwitch.checked ? "inline" : "none";
      }
    });
  }

