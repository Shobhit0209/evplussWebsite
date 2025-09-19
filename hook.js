const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const loader = document.getElementById("loader");

async function fetchNews(query) {
  try {
    // Show loading message
    loader.classList.remove("hidden");
    newsContainer.innerHTML = "";

    // Fix: Use template literal properly with backticks, not quotes
    const response = await fetch(
      `https://newsdata.io/api/1/latest?q=${query}&apikey=pub_c5b462ec16a6402aabc96ca1ed961c7d`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if API returned an error
    if (data.status === "error") {
      throw new Error(data.message || "API returned an error");
    }
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    newsContainer.innerHTML = `<p>Failed to load news: ${error.message}</p>`;
  } finally {
    loader.classList.add("hidden");
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a search term");
    return;
  }

  const result = await fetchNews(query);
  console.log(result);

  // Fix: Actually call displayNews with the results
  if (result && result.results) {
    displayNews(result.results);
  }
});

// Also load news on page load
document.addEventListener("DOMContentLoaded", async () => {
  const result = await fetchNews("electric vehicles");
  if (result && result.results) {
    displayNews(result.results);
  }
});

// Allow search on Enter key press
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});

function displayNews(articles) {
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML =
      "<p>No news articles found. Try a different search.</p>";
    return;
  }

  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    const newsCard = document.createElement("div");
    newsCard.className = "news-card";

    const imageUrl = article.image_url || "https://via.placeholder.com/300x200";

    newsCard.innerHTML = `
      <img src="${imageUrl}" alt="News Image" onerror="this.src='https://via.placeholder.com/300x200'">
      <div class="content">
        <h2>${article.title || "No title available"}</h2>
        <p>${article.description || "No description available."}</p>
        <div class="meta">
          <small>Source: ${article.source_name || "Unknown"}</small>
          <small>Published: ${new Date(
            article.pubDate
          ).toLocaleDateString()}</small>
        </div>
        <a href="${article.link}" target="_blank">Read More</a>
      </div>`;
    newsContainer.appendChild(newsCard);
  });
}

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
