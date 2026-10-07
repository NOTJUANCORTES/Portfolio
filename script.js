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
