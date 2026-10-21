// ===== PROFILE CARD PHOTO SLIDER =====
(function () {
    const slides = document.querySelectorAll(".photo-slider .ps-slide");
    const dotsBox = document.getElementById("psDots");

    if (!slides.length || !dotsBox) return;

    const DELAY = 3500; // 3500 = 3.5 segundos kada picture
    let current = 0;

    slides.forEach(() => dotsBox.appendChild(document.createElement("i")));
    const dots = dotsBox.children;
    dots[0].classList.add("on");

    function showSlide(next) {
        slides.forEach((s) => s.classList.remove("out"));
        slides[current].classList.remove("active");
        slides[current].classList.add("out");
        dots[current].classList.remove("on");

        current = (next + slides.length) % slides.length;

        slides[current].classList.add("active");
        dots[current].classList.add("on");
    }

    setInterval(() => showSlide(current + 1), DELAY);
})();
