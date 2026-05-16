// Telegram Button
const telegramButton = document.createElement("button");

telegramButton.classList.add("telegram-group-button");

telegramButton.innerHTML = `
<svg class="icon-telegram" viewBox="0 0 24 24">
  <path clip-rule="evenodd"
    d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
    fill-rule="evenodd" />
</svg>
`;

document.body.appendChild(telegramButton);

telegramButton.addEventListener("click", function () {
  window.location.href = "https://t.me/nextplp";
});

// Style
const style = document.createElement("style");

style.innerHTML = `
.telegram-group-button{
  position:fixed;
  z-index:20;
  left:20px;
  bottom:70px;
  width:36px;
  height:36px;
  background:var(--navB);
  border:2.5px solid var(--linkC);
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
}

.icon-telegram{
  width:24px;
  height:24px;
  fill:#fff;
}
`;

document.head.appendChild(style);

// Search Placeholder Animation
const searchInput = document.getElementById("search");

const items = [
  "logo",
  "banner",
  "thumbnail",
  "posters",
  "flyer",
  "mockup"
];

let currentIndex = 0;

function typePlaceholder() {

  let text = items[currentIndex];
  let i = 0;

  searchInput.placeholder = "Search for ";

  let typing = setInterval(() => {

    searchInput.placeholder += text.charAt(i);

    i++;

    if (i === text.length) {

      clearInterval(typing);

      setTimeout(() => {
        clearPlaceholder(text.length);
      }, 2000);

    }

  }, 150);
}

function clearPlaceholder(length) {

  let i = length;

  let deleting = setInterval(() => {

    searchInput.placeholder =
      searchInput.placeholder.slice(0, -1);

    i--;

    if (i === 0) {

      clearInterval(deleting);

      currentIndex =
        (currentIndex + 1) % items.length;

      typePlaceholder();

    }

  }, 80);
}

if (searchInput) {
  typePlaceholder();
}

// Download Link + File Size
const vectorIdElement =
  document.getElementById("vector-id");

if (vectorIdElement) {

  const vectorId =
    vectorIdElement.textContent.trim();

  const downloadLink =
    `https://cloud.nextplp.com/free/${vectorId}.plp`;

  const linkElement =
    document.getElementById("download-link");

  if (linkElement) {
    linkElement.href = downloadLink;
  }

  async function fetchFileSize(url) {

    try {

      const response = await fetch(url, {
        method: "HEAD"
      });

      const fileSize =
        response.headers.get("Content-Length");

      const fileSizeElement =
        document.getElementById("file-size");

      if (fileSize && fileSizeElement) {

        const sizeInMB =
          (fileSize / (1024 * 1024)).toFixed(2);

        fileSizeElement.textContent =
          sizeInMB + " MB";

      }

    } catch (error) {

      const fileSizeElement =
        document.getElementById("file-size");

      if (fileSizeElement) {
        fileSizeElement.textContent =
          "Unavailable";
      }

    }

  }

  fetchFileSize(downloadLink);

}
