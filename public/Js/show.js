document.addEventListener('DOMContentLoaded', () => {
    const deleteBtn = document.getElementById('delete-listing-btn');
    const deleteForm = document.getElementById('delete-listing-form');

    if (deleteBtn && deleteForm) {
        deleteBtn.addEventListener('click', (event) => {
            // Prevent the form from submitting immediately
            event.preventDefault();

            // Show the SweetAlert2 confirmation popup
            Swal.fire({
                title: 'Are you sure?',
                text: "This listing will be permanently deleted!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                // If the user confirms the action
                if (result.isConfirmed) {
                    // Manually submit the delete form
                    deleteForm.submit();
                }
            });
        });
    }
});



// For Payment Integration Js , Paypal , Manual Booking 
