const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const links = document.querySelectorAll("a.link");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function closeMenu() {
  menu.classList.remove("active");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Abrir menu");
}

btn.addEventListener("click", () => {
  const open = menu.classList.toggle("active");
  btn.setAttribute("aria-expanded", String(open));
  btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("active")) {
    closeMenu();
    btn.focus();
  }
});

links.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      closeMenu();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", this.getAttribute("href"));
    }
  });
});

// Reveal ao rolar: só entra em ação se o usuário não pediu menos movimento
// (a classe js-reveal é adicionada no <head>).
const revealItems = document.querySelectorAll("[data-reveal]");

if (
  document.documentElement.classList.contains("js-reveal") &&
  "IntersectionObserver" in window
) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Destaca no menu a seção que está na tela.
const sections = [...document.querySelectorAll("main section[id]")];
const linkFor = (id) => document.querySelector(`nav a[href="#${id}"]`);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.removeAttribute("aria-current"));
        const active = linkFor(entry.target.id);
        if (active) active.setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((section) => navObserver.observe(section));
}

const progress = document.createElement("div");
progress.className = "reading-progress";
progress.setAttribute("aria-hidden", "true");
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
