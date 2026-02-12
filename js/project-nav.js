// js/project-nav.js
(() => {
  const prevEl = document.getElementById("projectPrev");
  const nextEl = document.getElementById("projectNext");
  const projects = window.PROJECTS_INDEX;

  if (!prevEl || !nextEl || !Array.isArray(projects) || projects.length < 2)
    return;

  const currentPath = window.location.pathname.replace(/\/+$/, "");
  const idx = projects.findIndex(
    (p) => p.path.replace(/\/+$/, "") === currentPath,
  );
  if (idx === -1) return;

  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  prevEl.href = prev.path;
  nextEl.href = next.path;

  prevEl.setAttribute("aria-label", `Previous project: ${prev.title}`);
  nextEl.setAttribute("aria-label", `Next project: ${next.title}`);
})();
