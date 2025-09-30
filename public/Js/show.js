// Paypal  order js 
document.addEventListener('DOMContentLoaded', () => {
      // Only run booking logic if the booking form exists on the page
      if (document.getElementById('booking-form')) {
          const listingId = pageData.listingId;
          const userId = pageData.userId;
          const pricePerNight =pageData.pricePerNight;

          // Form elements
          const dateInput = document.getElementById('dates');
          const checkInInput = document.getElementById('checkInDate');
          const checkOutInput = document.getElementById('checkOutDate');
          const bookingOptions = document.getElementById('booking-options');
          const bookingInfo = document.getElementById('booking-info');
          const bookingError = document.getElementById('booking-error');
          const paypalContainer = document.getElementById('paypal-button-container');
          const priceCalcDiv = document.getElementById('price-calculation');

          let checkIn, checkOut, totalPrice;

          // Initialize the Date Picker
          const datePicker = flatpickr(dateInput, {
              mode: "range",
              minDate: "today",
              dateFormat: "Y-m-d",
              // This function runs every time the user changes the date selection
              onChange: function(selectedDates) {
                  // Hide booking options and errors when dates are changed
                  bookingOptions.style.display = 'none';
                  paypalContainer.innerHTML = '';
                  bookingInfo.style.display = 'block';
                  bookingInfo.innerText = 'Please select your dates to continue.';
                  bookingError.style.display = 'none';

                  if (selectedDates.length === 2) {
                      checkIn = selectedDates[0];
                      checkOut = selectedDates[1];
                      const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));

                      if (nights > 0) {
                          totalPrice = nights * pricePerNight;
                          // Update hidden inputs for the manual booking form
                          checkInInput.value = checkIn.toISOString().split('T')[0];
                          checkOutInput.value = checkOut.toISOString().split('T')[0];

                          // Update price display
                          document.getElementById('price-breakdown').innerText = `₹${pricePerNight.toLocaleString()} x ${nights} nights`;
                          document.getElementById('total-price').innerText = totalPrice.toLocaleString();

                          // Show the booking options and hide the helper text
                          bookingOptions.style.display = 'block';
                          bookingInfo.style.display = 'none';

                          // Render the PayPal buttons so they are ready
                          renderPayPalButtons();
                      }
                  }
              }
          });

          function renderPayPalButtons() {
              paypal.Buttons({
                  createOrder: async (data, actions) => {
                      bookingError.style.display = 'none';
                      try {
                          const response = await fetch(`/api/booking/${listingId}/create-order`, {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify({
                                  checkIn: checkIn.toISOString().split('T')[0],
                                  checkOut: checkOut.toISOString().split('T')[0],
                              })
                          });
                          const orderData = await response.json();
                          if (!response.ok) throw new Error(orderData.error);
                          totalPrice = orderData.totalPrice;
                          return orderData.orderID;
                      } catch (err) {
                          bookingError.innerText = err.message;
                          bookingError.style.display = 'block';
                          return Promise.reject(err);
                      }
                  },
                  onApprove: async (data, actions) => {
                      try {
                          const response = await fetch(`/api/booking/${data.orderID}/capture`, {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify({ listingId, userId, checkIn, checkOut, price: totalPrice })
                          });
                          const captureData = await response.json();
                          if(response.ok) {
                              window.location.href = captureData.redirectUrl;
                          } else {
                              throw new Error(captureData.error || 'Failed to finalize booking.');
                          }
                      } catch (err) {
                          bookingError.innerText = err.message;
                          bookingError.style.display = 'block';
                      }
                  }
              }).render('#paypal-button-container');
          }
      }

    

  });




// Delete Confirmation 
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



