// --- Bootstrap Validation ---
// This code is safe as is, because querySelectorAll returns an empty list if no forms are found, which doesn't cause a crash.
(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})();


// --- Password Toggle for Login/Signup Forms ---
const passwordField = document.getElementById("password");
const toggleIcon = document.getElementById("password-toggle-icon");

// ✅ THE FIX: Only run this code if both the password field and toggle icon exist on the page.
if (passwordField && toggleIcon) {
    toggleIcon.addEventListener("click", function () {
        const type =
            passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        // This is a more robust way to toggle classes
        this.querySelector("i").classList.toggle("fa-eye");
        this.querySelector("i").classList.toggle("fa-eye-slash");
    });
}


// --- Logic for Filter Scroll Buttons on Index Page ---
const scrollRightBtn = document.getElementById("scroll-right");
const scrollArea = document.getElementById("filters-scroll-area");

// ✅ THE FIX: Only run this code if the filter scroll elements exist.
if (scrollRightBtn && scrollArea) {
    const checkScroll = () => {
        const atEnd = scrollArea.scrollWidth - scrollArea.clientWidth <= scrollArea.scrollLeft + 1;
        scrollRightBtn.classList.toggle("hidden", atEnd);
    };

    scrollRightBtn.addEventListener("click", () => {
        scrollArea.scrollLeft += 350;
    });

    scrollArea.addEventListener("scroll", checkScroll);
    window.addEventListener("load", checkScroll);
    window.addEventListener("resize", checkScroll);
}


// --- Logic for Tax Toggle Switch on Index Page ---
const taxSwitch = document.getElementById("switchCheckDefault");

// ✅ THE FIX: Only run this code if the tax switch exists.
if (taxSwitch) {
    taxSwitch.addEventListener("click", () => {
        let taxInfoElements = document.getElementsByClassName("tax-info");
        for (let info of taxInfoElements) {
            // If the switch is checked, display is "inline", otherwise "none".
            info.style.display = taxSwitch.checked ? "inline" : "none";
        }
    });
}

// --- Logic for Delete Confirmation ---
// NOTE: confirm() is blocking and looks dated. Consider using SweetAlert2 which you already have loaded!
function handleDeleteForms() {
    const forms = document.querySelectorAll('.delete-form');
    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Stop the form from submitting immediately

            // A better-looking confirmation pop-up
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // If the user confirms, submit the form programmatically
                    form.submit();
                }
            })
        });
    })
}
// Run the delete form setup when the page content is loaded.
window.addEventListener("DOMContentLoaded", handleDeleteForms);
