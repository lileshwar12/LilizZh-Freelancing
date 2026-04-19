const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

if (contactForm && formNote) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formNote.textContent = "Sending inquiry...";
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }

    const formData = new FormData(contactForm);
    formData.set("allow-calls", document.getElementById("allow-calls")?.checked ? "Yes" : "No");

    try {
      const response = await fetch("https://formsubmit.co/ajax/lilizzh.studio@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      formNote.textContent = "Thanks. Your inquiry has been sent successfully.";
      contactForm.reset();
    } catch (error) {
      formNote.textContent = "Could not send right now. Please email lilizzh.studio@gmail.com directly.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      navLinks?.classList.remove("open");
    }
  });
});
