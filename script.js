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

const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const apiKey = "pub_c5b462ec16a6402aabc96ca1ed961c7d";
const baseUrl = "https://newsdata.io/api/1";
const endpoint = "/latest";
const fullUrl = `${baseUrl}${endpoint}`;
const params = {
  apiKey: apiKey,
  q: "electric vehicles", // The search query
  language: "en", // The language of the articles
  country: "in", // How to sort the results
};

// Function to fetch news
async function fetchNews(query) {
  if (!newsContainer) {
    console.error("The #news-container element was not found.");
    return;
  }
  newsContainer.innerHTML = "<p>Loading news...</p>";
  params.q = query || "electric vehicles";
  const url = new URL(fullUrl);
  url.search = new URLSearchParams(params).toString();
  console.log("Requesting URL:", url.toString());

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json(); // Try to get more error details from API
      throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
    }
    const data = await response.json();
    displayNews(data.results);
    console.log("Success:", data);
  } catch (e) {
    console.error("Fetch error:", e);
    newsContainer.innerHTML = `<p>Failed to load news. ${e.message}</p>`;
  }
}

// Function to display news articles on the page
function displayNews(articles) {
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML =
      "<p>No news articles found. Try a different search.</p>";
    return;
  }
  newsContainer.innerHTML = ""; // Clear the "Loading" message

  articles.forEach((article) => {
    const newsCard = document.createElement("div");
    newsCard.className = "news-card";

    const imageUrl = article.image_url
      ? article.image_url
      : "https://via.placeholder.com/300x200";

    newsCard.innerHTML = `
            <img src="${imageUrl}" alt="News Image">
            <div class="content">
                <h2>${article.title}</h2>
                <p>${article.description || "No description available."}</p>
                <a href="${article.link}" target="_blank">Read More</a>
            </div>
        `;
    newsContainer.appendChild(newsCard);
  });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  }
});
fetchNews("electric vehicle");
