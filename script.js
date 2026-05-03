// MENU MOBILE
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// SCROLL SUAVE
const links = document.querySelectorAll('a.link');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: "smooth"
      });
    }
  });
});