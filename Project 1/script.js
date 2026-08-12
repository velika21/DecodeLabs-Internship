const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const startBtn = document.getElementById("startBtn");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    if (navLinks.classList.contains("show")) {
        navLinks.style.display = "flex";
    } else {
        navLinks.style.display = "none";
    }
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");

        if (window.innerWidth < 768) {
            navLinks.style.display = "none";
        }
    });
});

startBtn.addEventListener("click", () => {
    alert("Welcome to CraftSpace! Your workspace is ready.");
});