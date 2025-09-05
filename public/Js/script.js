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