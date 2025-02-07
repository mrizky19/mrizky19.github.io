// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixednav = header.offsetTop;

  if (window.pageYOffset > fixednav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// Hamburger Menu
const Hamburger = document.querySelector("#hamburger");
const Navmenu = document.querySelector("#nav-menu");

Hamburger.addEventListener("click", function () {
  Hamburger.classList.toggle("hamburger-active");
  Navmenu.classList.toggle("hidden");
});
