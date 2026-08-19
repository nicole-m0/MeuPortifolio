const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const links = document.querySelectorAll("a.link");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

document.body.classList.add("js-enabled");

btn.addEventListener("click", () => {
  menu.classList.toggle("active");
  btn.setAttribute("aria-expanded", menu.classList.contains("active"));
});

links.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      menu.classList.remove("active");
      btn.setAttribute("aria-expanded", "false");
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
});

if (!reduceMotion) {
  const revealItems = document.querySelectorAll(
    ".section-label, .two-columns, .skills article, .project, .service-list article, .education article, .contact > *",
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${(index % 4) * 90}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => observer.observe(item));

  document.querySelectorAll(".project").forEach((project) => {
    project.addEventListener("pointermove", (event) => {
      const rect = project.getBoundingClientRect();
      project.style.setProperty("--x", `${event.clientX - rect.left}px`);
      project.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
  });
}

const progress = document.createElement("div");
progress.className = "reading-progress";
document.body.append(progress);

window.addEventListener(
  "scroll",
  () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const percentage = maxScroll ? (window.scrollY / maxScroll) * 100 : 0;
    progress.style.transform = `scaleX(${percentage / 100})`;
  },
  { passive: true },
);
