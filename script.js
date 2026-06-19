const normalisedLocation = location.pathname.endsWith("/")
  ? `${location.pathname}index.html`
  : location.pathname;
const filename = normalisedLocation.split("/").pop();
const path = normalisedLocation.includes("/services/")
  ? `services/${filename}`
  : filename;

const serviceLinks = [
  ["services/index.html", "All services"],
  ["services/trauma-ptsd.html", "Trauma & PTSD"],
  ["services/anxiety.html", "Anxiety"],
  ["services/emdr.html", "EMDR therapy"],
  ["services/maternal-mental-health.html", "Maternal mental health"],
  ["services/acc-referrals.html", "ACC & referral pathways"]
];

const current = href => {
  const target = href.endsWith("/") ? `${href}index.html` : href;
  return path === target;
};

document.querySelector("[data-header]")?.insertAdjacentHTML("afterbegin", `
  <div class="availability">
    Referral availability varies by pathway. <a href="services/acc-referrals.html">View referral information</a> or <a href="contact.html">make an enquiry</a>.
  </div>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Power Psychology home">
        <img src="assets/power-psychology-logo.avif" alt="Power Psychology">
      </a>
      <nav class="main-nav" id="main-nav" aria-label="Main navigation">
        <a href="index.html"${current("index.html") ? ' aria-current="page"' : ""}>Home</a>
        <a href="about.html"${current("about.html") ? ' aria-current="page"' : ""}>About Me</a>
        <div class="nav-parent${path.startsWith("services/") ? " open-current" : ""}">
          <button type="button" aria-expanded="false">Services</button>
          <div class="submenu">
            ${serviceLinks.map(([href,label]) => `<a href="${href}"${current(href) ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
          </div>
        </div>
        <a href="faq.html"${current("faq.html") ? ' aria-current="page"' : ""}>FAQ</a>
        <a href="contact.html"${current("contact.html") ? ' aria-current="page"' : ""}>Contact</a>
      </nav>
      <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">☰</button>
    </div>
  </header>
`);

document.querySelector("[data-footer]")?.insertAdjacentHTML("afterbegin", `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html"><img src="assets/power-psychology-logo.avif" alt="Power Psychology"></a>
          <p>Clinical psychology services for adults, based in Milford on Auckland’s North Shore, with telehealth available where appropriate.</p>
          <a href="mailto:admin@powerpsychology.co.nz">admin@powerpsychology.co.nz</a>
        </div>
        <nav aria-label="Services">
          <strong>Services</strong>
          ${serviceLinks.map(([href,label]) => `<a href="${href}">${label}</a>`).join("")}
        </nav>
        <nav aria-label="Practice information">
          <strong>Practice information</strong>
          <a href="about.html">About Dr Shannon Martin</a>
          <a href="faq.html">Frequently asked questions</a>
          <a href="contact.html">Contact and accessibility</a>
          <a href="privacy.html">Privacy</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Power Psychology. Prototype website for review.</span>
        <span>Milford, Auckland 0620</span>
      </div>
    </div>
  </footer>
`);

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".main-nav");
menuButton?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});

const serviceButton = document.querySelector(".nav-parent > button");
serviceButton?.addEventListener("click", () => {
  const parent = serviceButton.closest(".nav-parent");
  const open = parent.classList.toggle("open");
  serviceButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".faq details").forEach(detail => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq details").forEach(other => {
      if (other !== detail) other.open = false;
    });
  });
});

const form = document.querySelector("[data-prototype-form]");
const requestedType = new URLSearchParams(location.search).get("type");
if (requestedType === "acc") {
  const select = form?.querySelector("#type");
  if (select) select.value = "ACC or funded referral enquiry";
}
form?.addEventListener("submit", event => {
  event.preventDefault();
  const status = form.querySelector(".form-status");
  status.classList.add("show");
  status.focus();
});
