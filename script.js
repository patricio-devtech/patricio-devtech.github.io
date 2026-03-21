document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");

  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  const chars =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split(
      "",
    );
  const fontSize = 14;
  let columns = width / fontSize;
  let drops = [];

  function initDrops() {
    columns = width / fontSize;
    drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * height;
    }
  }
  initDrops();
  window.addEventListener("resize", initDrops);

  function draw() {
    ctx.fillStyle = "rgba(10, 10, 12, 0.05)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#4ade80";
    ctx.font = fontSize + 'px "JetBrains Mono"';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.globalAlpha = Math.random() * 0.5 + 0.1;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();

  gsap.registerPlugin(ScrollTrigger);

  const sections = document.querySelectorAll(".gsap-fade-in");

  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  });
});
// Menú hamburguesa
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});