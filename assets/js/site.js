// Small enhancements. Every page works without this file.

// Copy buttons on writeup code blocks.
document.querySelectorAll(".prose div.highlighter-rouge").forEach((block) => {
  const code = block.querySelector("code");
  if (!code || !navigator.clipboard) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy";
  button.textContent = "copy";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.innerText.replace(/\n$/, ""));
      button.textContent = "copied";
    } catch {
      button.textContent = "failed";
    }
    setTimeout(() => { button.textContent = "copy"; }, 1600);
  });
  block.appendChild(button);
});

// Severity filter on the CVEs page. Without JS the buttons stay hidden and every card shows.
const filters = document.querySelector(".filters");
if (filters) {
  const cards = document.querySelectorAll(".cve-card");
  const shown = document.querySelector("[data-shown]");
  filters.hidden = false;
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    const level = button.dataset.filter;
    let count = 0;
    cards.forEach((card) => {
      const match = level === "all" || card.dataset.severity === level;
      card.hidden = !match;
      if (match) count += 1;
    });
    filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    if (shown) shown.textContent = count;
  });
}

// "On this page" marks the section being read.
const tocLinks = [...document.querySelectorAll(".toc a")];
if (tocLinks.length && "IntersectionObserver" in window) {
  const byId = new Map(tocLinks.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  // Each time a heading crosses the top 40% of the screen, recompute the active one.
  const observer = new IntersectionObserver(() => {
    const headings = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
    // The active section is the last heading above the middle of the screen.
    let active = headings[0];
    for (const h of headings) {
      if (h.getBoundingClientRect().top < window.innerHeight * 0.4) active = h;
    }
    tocLinks.forEach((a) => a.classList.toggle("is-active", byId.get(active.id) === a));
  }, { rootMargin: "0px 0px -60% 0px" });
  byId.forEach((_, id) => {
    const h = document.getElementById(id);
    if (h) observer.observe(h);
  });
}
