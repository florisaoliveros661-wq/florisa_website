// ===== MAS INTERACTIVE: tilt, bubble messages, spotlight, back-to-top =====
(function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Photo slider mo-tilt (3D) kung i-hover
    const slider = document.querySelector(".photo-slider");
    if (slider && !reduce) {
        slider.addEventListener("mousemove", (e) => {
            const r = slider.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            slider.style.transform =
                `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
        });
        slider.addEventListener("mouseleave", () => {
            slider.style.transform = "";
        });
    }

    // 2. "Keep shining!" i-click = bag-ong message + sparkles
    const bubble = document.querySelector(".floating-bubble");
    const messages = ["Keep shining!", "You got this! 💪", "Dream big ✨", "Believe in yourself 💜", "Keep learning 📚", "Stay inspired ♡"];
    let m = 0;

    function sparkles(x, y) {
        if (reduce) return;
        const icons = ["✦", "✧", "♡", "✨"];
        for (let i = 0; i < 12; i++) {
            const s = document.createElement("span");
            s.textContent = icons[Math.floor(Math.random() * icons.length)];
            s.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:500;pointer-events:none;` +
                `font-size:${14 + Math.random() * 14}px;color:${["#8B5CF6", "#E0559B", "#5B3FD6", "#FF7DB5"][i % 4]}`;
            document.body.appendChild(s);
            const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 80;
            s.animate(
                [{ transform: "translate(0,0) scale(1)", opacity: 1 },
                 { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(.3)`, opacity: 0 }],
                { duration: 900 + Math.random() * 400, easing: "ease-out" }
            ).onfinish = () => s.remove();
        }
    }

    if (bubble) {
        bubble.setAttribute("role", "button");
        bubble.setAttribute("tabindex", "0");
        const next = () => {
            m = (m + 1) % messages.length;
            bubble.textContent = messages[m];
            const r = bubble.getBoundingClientRect();
            sparkles(r.left + r.width / 2, r.top + r.height / 2);
        };
        bubble.addEventListener("click", next);
        bubble.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); } });
    }

    // 3. Spotlight nga mosunod sa mouse sa sulod sa cards
    document.querySelectorAll(".info-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
    });

    // 4. Back-to-top button (mogawas kung naka-scroll na)
    const topBtn = document.createElement("button");
    topBtn.className = "back-to-top-btn";
    topBtn.setAttribute("aria-label", "Back to top");
    topBtn.textContent = "↑";
    document.body.appendChild(topBtn);
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
        topBtn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
})();
