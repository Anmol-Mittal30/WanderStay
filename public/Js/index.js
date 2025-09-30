

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