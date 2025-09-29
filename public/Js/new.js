 // script for live image preview ---
  const imageUpload = document.getElementById("imageUpload");
  const listingPreview = document.getElementById("listingPreview");
  const imagePlaceholder = document.getElementById("imagePlaceholder");
  const imageError = document.getElementById("image-error"); // Get the error element

  imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        listingPreview.src = e.target.result;
        listingPreview.classList.remove("d-none");
        imagePlaceholder.classList.add("d-none");
        imageError.classList.remove("is-visible"); // Hide error if image is selected
      };
      reader.readAsDataURL(file);
    } else {
        // If file is unselected (e.g., user opens and cancels), show placeholder
        listingPreview.classList.add("d-none");
        imagePlaceholder.classList.remove("d-none");
        // Optionally show error here if it was a required field
    }
  });

  // --- script for description char counter---
  const descriptionInput = document.getElementById("description");
  const charCount = document.getElementById("charCount");
  descriptionInput.addEventListener("input", () => {
    charCount.textContent = descriptionInput.value.length;
  });

  // script for bootstap validation ---
  (() => {
    "use strict";
    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.addEventListener("submit", (event) => {
        // Custom validation for image
        if (imageUpload.files.length === 0) {
          imageError.classList.add("is-visible");
          event.preventDefault();
          event.stopPropagation();
        } else {
           imageError.classList.remove("is-visible");
        }

        // Default Bootstrap validation for all other fields (including the select)
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      }, false);
    });
  })();