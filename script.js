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

// Animated background.

const canvas = document.querySelector("#wave-background");
const context = canvas.getContext("2d");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let width;
let height;
let pixelRatio;
let time = 0;

const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}$#@+-";
const fontSize = 16;

let columns = 0;
let drops = [];

function resizeCanvas() {
  pixelRatio = window.devicePixelRatio || 1;

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  columns = Math.floor(width / fontSize);

  drops = Array.from(
    { length: columns },
    () => Math.random() * -50
  );
}

function drawGrid() {
  context.strokeStyle = "rgba(57, 255, 20, 0.055)";
  context.lineWidth = 1;

  const gridSize = 40;

  for (let x = 0; x < width; x += gridSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y < height; y += gridSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

function drawMatrixRain() {
  context.font = `${fontSize}px "Courier New"`;
  context.textAlign = "center";

  drops.forEach((drop, index) => {
    const character =
      characters[Math.floor(Math.random() * characters.length)];

    const x = index * fontSize;
    const y = drop * fontSize;

    context.fillStyle = "rgba(57, 255, 20, 0.13)";
    context.fillText(character, x, y);

    drops[index] += 0.18 + Math.random() * 0.08;

    if (y > height && Math.random() > 0.985) {
      drops[index] = Math.random() * -30;
    }
  });
}

function drawWave(row, totalRows) {
  const rowHeight = height / totalRows;
  const centerY = rowHeight * row + rowHeight / 2;

  context.beginPath();

  context.strokeStyle = "rgba(57, 255, 20, 0.7)";
  context.lineWidth = 1.4;
  context.shadowColor = "#39ff14";
  context.shadowBlur = 7;

  for (let x = 0; x <= width; x += 5) {
    const regularWave =
      Math.sin(x * 0.045 + time + row) * 8;

    const smallerWave =
      Math.sin(x * 0.13 - time * 1.4 + row * 2) * 4;

    const spikePosition =
      Math.sin(x * 0.012 + time * 0.6 + row);

    const spike =
      Math.pow(Math.abs(spikePosition), 22) *
      Math.sin(x * 0.08 + row) *
      65;

    const y = centerY + regularWave + smallerWave + spike;

    if (x === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }

  context.stroke();
  context.shadowBlur = 0;
}

function drawStaticBackground() {
  context.fillStyle = "#020703";
  context.fillRect(0, 0, width, height);
  drawGrid();
}

function animate() {
  context.fillStyle = "rgba(2, 7, 3, 0.2)";
  context.fillRect(0, 0, width, height);

  drawGrid();
  drawMatrixRain();

  const totalRows = 7;

  for (let row = 0; row < totalRows; row++) {
    drawWave(row, totalRows);
  }

  time += 0.01;
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resizeCanvas();

  if (prefersReducedMotion) {
    drawStaticBackground();
  }
});

resizeCanvas();

if (prefersReducedMotion) {
  drawStaticBackground();
} else {
  context.fillStyle = "#020703";
  context.fillRect(0, 0, width, height);
  animate();
}
