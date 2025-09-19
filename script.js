const texts = [
  "One step solution for all your EV needs.",
  "Building India's Best EV Ecosystem.",
  "Find EV charging stations instantly.",
  "Drive India toward a greener future.",
];

let count = 0;
let index = 0;
let currentText = "";
let isDeleting = false;
const typingSpeed = 50; // ms per character
const deletingSpeed = 50; // ms per character
const pauseBetween = 1000; // pause before deleting

function type() {
  const fullText = texts[count];

  if (isDeleting) {
    currentText = fullText.substring(0, currentText.length - 1);
  } else {
    currentText = fullText.substring(0, currentText.length + 1);
  }

  document.querySelector(".animated-text").textContent = currentText;

  let delay = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && currentText === fullText) {
    delay = pauseBetween;
    isDeleting = true;
  } else if (isDeleting && currentText === "") {
    isDeleting = false;
    count = (count + 1) % texts.length;
    delay = typingSpeed;
  }

  setTimeout(type, delay);
}
type();

window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("show");
  menuIcon.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    navbar.classList.remove("show");
    menuIcon.classList.remove("active");
  }
});

// Close menu when clicking on a link
navbar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show");
    menuIcon.classList.remove("active");
  });
});
