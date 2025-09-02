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