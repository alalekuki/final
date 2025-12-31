const centertext = document.getElementById("centertext");
const boxes = document.querySelectorAll(".box");
const ballContainer = document.getElementById("ballContainer");
let particlesEnabled = false;
let mouseTrail = [];

// Start button click handler
centertext.addEventListener("click", () => {
  centertext.classList.add("active");

  setTimeout(() => {
    // Don't hide the button, just make it invisible but keep as background
    centertext.style.zIndex = "-1";
    centertext.style.opacity = "0";

    // Change body background to yellow
    document.body.classList.add("yellow-bg");

    // Show boxes with staggered animation
    boxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add("show");
      }, index * 200);
    });

    // Show ball container
    setTimeout(() => {
      ballContainer.classList.add("show");
      startBallAnimation();
    }, 600);

    // Enable particle effect
    particlesEnabled = true;
  }, 1000);
});

// Track mouse position for trail effect
document.addEventListener("mousemove", (e) => {
  if (!particlesEnabled) return;

  mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

  // Keep only recent positions
  mouseTrail = mouseTrail.filter((pos) => Date.now() - pos.time < 100);

  // Create particles at trail positions
  if (mouseTrail.length > 1) {
    const trailPos = mouseTrail[Math.floor(mouseTrail.length / 2)];

    for (let i = 0; i < 2; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = trailPos.x + (Math.random() - 0.5) * 10 + "px";
      particle.style.top = trailPos.y + (Math.random() - 0.5) * 10 + "px";
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  }
});

// Bouncing ball physics
function startBallAnimation() {
  const ball = document.getElementById("bouncingBall");
  const container = document.getElementById("ballContainer");

  let x = 85;
  let y = 50;
  let vx = 2 + Math.random() * 2;
  let vy = 2 + Math.random() * 2;
  const ballSize = 30;

  function animate() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    x += vx;
    y += vy;

    // Bounce off walls
    if (x <= 0 || x >= containerWidth - ballSize) {
      vx = -vx;
      x = Math.max(0, Math.min(x, containerWidth - ballSize));
    }

    if (y <= 0 || y >= containerHeight - ballSize) {
      vy = -vy;
      y = Math.max(0, Math.min(y, containerHeight - ballSize));
    }

    ball.style.left = x + "px";
    ball.style.top = y + "px";

    requestAnimationFrame(animate);
  }

  animate();
}

// Function to open page
function openPage(pageId) {
  const page = document.getElementById(pageId);
  page.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Function to close page
function closePage(pageId) {
  const page = document.getElementById(pageId);
  page.classList.remove("active");
  document.body.style.overflow = "hidden";
}

// Add click handlers to boxes
document.getElementById("a").addEventListener("click", function () {
  if (this.classList.contains("show")) {
    openPage("page-a");
  }
});

document.getElementById("b").addEventListener("click", function () {
  if (this.classList.contains("show")) {
    openPage("page-b");
  }
});

document.getElementById("c").addEventListener("click", function () {
  if (this.classList.contains("show")) {
    openPage("page-c");
  }
});

// Close page when clicking outside content
document.querySelectorAll(".page-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      closePage(this.id);
    }
  });
});
