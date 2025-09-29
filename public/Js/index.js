// const scrollRightBtn = document.getElementById("scroll-right");
//   const scrollArea = document.getElementById("filters-scroll-area");

//   if (scrollRightBtn && scrollArea) {
  
//     const checkScroll = () => {
//       // Check if we are at the end of the scrollable area
//       const atEnd = scrollArea.scrollWidth - scrollArea.clientWidth <= scrollArea.scrollLeft + 1;
      
//       scrollRightBtn.classList.toggle("hidden", atEnd);
//     };

//     // Event listener for the right button
//     scrollRightBtn.addEventListener("click", () => {
//       scrollArea.scrollLeft += 350; // Scroll right by 350 pixels
//     });

//     // Check scroll position whenever it changes
//     scrollArea.addEventListener("scroll", checkScroll);

    
//     window.addEventListener("load", checkScroll);
//     window.addEventListener("resize", checkScroll);
//   }

//   // --- Logic for Tax Toggle Switch ---
//   const taxSwitch = document.getElementById("switchCheckDefault");
//   if (taxSwitch) {
//     taxSwitch.addEventListener("click", () => {
    
//       let taxInfoElements = document.getElementsByClassName("tax-info");
    
//       for (let info of taxInfoElements) {
//         // This is a cleaner way to toggle between two states
//         info.style.display = taxSwitch.checked ? "inline" : "none";
//       }
//     });
//   }






  
// document.addEventListener('DOMContentLoaded', () => {
//     // --- Logic for Wishlist Buttons ---
//     const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
//     wishlistButtons.forEach(button => {
//         button.addEventListener('click', async (event) => {
//             event.preventDefault();
//             event.stopPropagation();

//             // The corrected login check
//             if (!isLoggedIn) {
//                 // If not logged in, redirect to the login page
//                 window.location.href = '/login';
//                 return;
//             }

//             // This code will only run if the user is logged in
//             const listingId = button.dataset.listingId;
//             const heartIcon = button.querySelector('i');
//             const isWishlisted = heartIcon.classList.contains('fa-solid');
//             const action = isWishlisted ? 'remove' : 'add';

//             try {
//                 const response = await fetch(`/api/wishlist/${listingId}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ action: action })
//                 });

//                 if (response.ok) {
//                     // Toggle the heart icon for instant feedback
//                     heartIcon.classList.toggle('fa-regular');
//                     heartIcon.classList.toggle('fa-solid');
//                 } else {
//                     console.error('Failed to update wishlist');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         });
//     });

//     // --- You can add your other scripts like the tax toggle here ---
// });



 document.addEventListener("DOMContentLoaded", () => {
    // --- Logic for Wishlist Buttons ---
    const wishlistButtons = document.querySelectorAll(".wishlist-btn");
    wishlistButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!isLoggedIn) {
          window.location.href = "/login";
          return;
        }
        const listingId = button.dataset.listingId;
        const heartIcon = button.querySelector("i");
        const isWishlisted = heartIcon.classList.contains("fa-solid");
        const action = isWishlisted ? "remove" : "add";
        try {
          const response = await fetch(`/api/wishlist/${listingId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: action }),
          });
          if (response.ok) {
            heartIcon.classList.toggle("fa-regular");
            heartIcon.classList.toggle("fa-solid");
          } else {
            console.error("Failed to update wishlist");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });

    // --- Logic for Filter Scroll Button ---
    const scrollRightBtn = document.getElementById("scroll-right");
    const scrollArea = document.getElementById("filters-scroll-area");
    if (scrollRightBtn && scrollArea) {
      const checkScroll = () => {
        const atEnd =
          scrollArea.scrollWidth - scrollArea.clientWidth <=
          scrollArea.scrollLeft + 1;
        scrollRightBtn.classList.toggle("hidden", atEnd);
      };
      scrollRightBtn.addEventListener("click", () => {
        scrollArea.scrollLeft += 350;
      });
      scrollArea.addEventListener("scroll", checkScroll);
      window.addEventListener("load", checkScroll);
      window.addEventListener("resize", checkScroll);
    }

    // --- Logic for Tax Toggle Switch ---
    const taxSwitch = document.getElementById("switchCheckDefault");
    if (taxSwitch) {
      taxSwitch.addEventListener("click", () => {
        let taxInfoElements = document.getElementsByClassName("tax-info");
        for (let info of taxInfoElements) {
          info.style.display = taxSwitch.checked ? "inline" : "none";
        }
      });
    }
  });