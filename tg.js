<script>
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Telegram Button
  // =========================

  const telegramButton = document.createElement("button");

  telegramButton.className = "telegram-group-button";

  telegramButton.innerHTML = `
    <svg class="icon-telegram"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor">

      <path fill-rule="evenodd"
        d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
        clip-rule="evenodd" />

      <path
        d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z"/>
    </svg>
  `;

  document.body.appendChild(telegramButton);

  telegramButton.addEventListener("click", () => {
    window.location.href = "https://t.me/nextplp";
  });

  // =========================
  // CSS
  // =========================

  const style = document.createElement("style");

  style.innerHTML = `
  
    .telegram-group-button{
      position:fixed;
      z-index:9999;
      left:20px;
      bottom:70px;
      width:45px;
      height:45px;
      border:none;
      border-radius:50%;
      background:#0088cc;
      color:#fff;
      display:flex;
      align-items:center;
      justify-content:center;
      cursor:pointer;
      box-shadow:0 4px 10px rgba(0,0,0,.2);
    }

    .icon-telegram{
      width:24px;
      height:24px;
    }

    .pwa-button{
      position:fixed;
      right:20px;
      bottom:70px;
      width:45px;
      height:45px;
      border:none;
      border-radius:50%;
      background:#111;
      color:#fff;
      display:flex;
      align-items:center;
      justify-content:center;
      cursor:pointer;
      z-index:9999;
      box-shadow:0 4px 10px rgba(0,0,0,.2);
    }

    .icon-pwa{
      width:24px;
      height:24px;
      fill:#fff;
    }

  `;

  document.head.appendChild(style);

  // =========================
  // Search Placeholder
  // =========================

  const searchInput =
    document.getElementById("search");

  const items = [
    "logo",
    "banner",
    "thumbnail",
    "posters",
    "flyer",
    "mockup",
    "brochure"
  ];

  let currentIndex = 0;

  function typePlaceholder() {

    if (!searchInput) return;

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

  typePlaceholder();

  // =========================
  // Download Link + File Size
  // =========================

  const vectorElement =
    document.getElementById("vector-id");

  if (vectorElement) {

    const vectorId =
      vectorElement.textContent.trim();

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

        const sizeElement =
          document.getElementById("file-size");

        if (fileSize && sizeElement) {

          const sizeInMB =
            (fileSize / (1024 * 1024)).toFixed(2);

          sizeElement.textContent =
            sizeInMB + " MB";

        } else if (sizeElement) {

          sizeElement.textContent =
            "Unavailable";

        }

      } catch (error) {

        const sizeElement =
          document.getElementById("file-size");

        if (sizeElement) {

          sizeElement.textContent =
            "Unavailable";

        }

      }

    }

    fetchFileSize(downloadLink);

  }

});
</script>

<script type="module">

(({
  button,
  onInstall
}) => {

  let deferredPrompt = null;

  const install = () => {

    if (!deferredPrompt) return;

    button.disabled = true;

    deferredPrompt.prompt()

      .then(result => {

        if (result.outcome === "accepted") {
          hide();
        }

      })

      .finally(() => {

        button.disabled = false;

      });

    deferredPrompt = null;

  };

  const beforeInstall = (e) => {

    e.preventDefault();

    deferredPrompt = e;

    button.hidden = false;

  };

  const hide = () => {

    button.hidden = true;

    button.removeEventListener(
      "click",
      install
    );

    window.removeEventListener(
      "beforeinstallprompt",
      beforeInstall
    );

  };

  if (button instanceof HTMLElement) {

    button.hidden = true;

    button.addEventListener(
      "click",
      install
    );

    window.addEventListener(
      "beforeinstallprompt",
      beforeInstall
    );

  }

  const installed = (e) => {

    if (button instanceof HTMLElement) {
      hide();
    }

    if (typeof onInstall === "function") {
      onInstall(e);
    }

    window.removeEventListener(
      "appinstalled",
      installed
    );

  };

  window.addEventListener(
    "appinstalled",
    installed
  );

})({

  button:

    document.getElementById(
      "app_install_button"
    ) ||

    Object.assign(

      document.body.appendChild(
        document.createElement("button")
      ),

      {
        hidden: true,
        type: "button",
        className: "pwa-button",

        innerHTML: `
          <svg class="icon-pwa"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">

            <path d="M330.7 352l77.72-192H356.9l-53.16 124.07L265.93 160h-39.61l-40.58 124.07-28.63-56.53-25.9 79.46 26.3 45h50.7l36.68-111.27 35 111.27z"/>
          </svg>
        `
      }

    ),

  onInstall() {}

});

</script>
