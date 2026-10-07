// Navigation: Projects is the default page.

const pageLinks = [...document.querySelectorAll("[data-page]")];
const pagePanels = [...document.querySelectorAll(".page-panel")];

function showPage() {
  const requestedPage = window.location.hash.slice(1);

  const currentPage = pagePanels.some(
    panel => panel.id === requestedPage
  )
    ? requestedPage
    : "projects";

  pagePanels.forEach(panel => {
    panel.hidden = panel.id !== currentPage;
  });

  pageLinks.forEach(link => {
    if (link.dataset.page === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  document.title =
    `${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} | Juan Cortes`;
}

window.addEventListener("hashchange", showPage);
showPage();

// Obfuscated email (not stored as plain mailto in HTML).

function buildContactEmail() {
  const user = ["juancortes", "management"].join(".");
  const domain = ["gmail", "com"].join(".");
  return `${user}@${domain}`;
}

function applyObfuscatedEmails() {
  const email = buildContactEmail();

  document.querySelectorAll(".js-email").forEach(link => {
    link.href = `mailto:${email}`;

    if (link.dataset.emailFormat === "hero") {
      link.textContent = `email: ${email}`;
    } else {
      link.textContent = `${email} →`;
    }
  });
}

applyObfuscatedEmails();
