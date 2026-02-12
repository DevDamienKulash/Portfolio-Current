// Minimal site JS (no visual/content changes)
// - Highlights active nav link as you scroll

(function () {
  const navLinks = Array.from(document.querySelectorAll('header a[href^="#"]'));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (!navLinks.length || !sections.length) return;

  const getNavOffset = () => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--nav-h")
      .trim();
    const n = parseInt(v.replace("px", ""), 10);
    return Number.isFinite(n) ? n : 0;
  };

  const setActive = () => {
    const offset = getNavOffset();
    const y = window.scrollY + offset + 2;

    let activeIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].offsetTop;
      if (y >= top) activeIndex = i;
    }

    navLinks.forEach((a) => a.classList.remove("is-active"));
    const activeHref = `#${sections[activeIndex].id}`;
    const activeLink = navLinks.find(
      (a) => a.getAttribute("href") === activeHref,
    );
    if (activeLink) activeLink.classList.add("is-active");
  };

  window.addEventListener("scroll", setActive, { passive: true });
  window.addEventListener("resize", setActive);
  setActive();
})();
// =========================
// Scroll Reveal (bidirectional)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) return;

  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  items.forEach((el) => {
    const type = el.getAttribute("data-reveal");
    el.classList.add("reveal");

    if (type === "card") {
      el.classList.add("reveal-card");
    }

    io.observe(el);
  });
});
window.addEventListener("DOMContentLoaded", () => {
  const bg = document.querySelector(".spline-bg");
  const spline = document.querySelector("spline-viewer");
  if (!bg || !spline) return;

  const reveal = () => {
    bg.classList.add("is-visible");
  };

  // Wait for the custom element to be defined
  customElements.whenDefined("spline-viewer").then(() => {
    // Slight delay so it feels intentional
    setTimeout(reveal, 200);
  });

  // Safety fallback (in case loading is weird)
  setTimeout(reveal, 3000);
});
