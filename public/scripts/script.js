function onPlayClickGame() {
  let headerBgID = document.getElementById("header-bg-id");
  headerBgID.style.animationDuration = "0.5s"

  let headerID = document.getElementById("header-id");
  headerID.classList.add("fade-out");

  let containerID = document.getElementById("container-id");
  containerID.classList.add("fade-out");

  setTimeout(() => {
    // Redirect to the game page
    window.location.href = "game.html";
  }, 500);
}

function onPlayClickTech() {
  let headerBgID = document.getElementById("header-bg-id");
  headerBgID.style.animationDuration = "0.5s"

  let headerID = document.getElementById("header-id");
  headerID.classList.add("fade-out");

  let containerID = document.getElementById("container-id");
  containerID.classList.add("fade-out");

  setTimeout(() => {
    // Redirect to the technical aspects page
    window.location.href = "mechanics.html";
  }, 500);
}

function onPlayClickBack() {
  let containerID = document.getElementById("container-id");
  containerID.classList.add("fade-out");

  setTimeout(() => {
    // Redirect previous page
    window.location.href = "/";
  }, 250);
}

function updateButtonText() {
  const isMobile = window.innerWidth <= 600;
  document.getElementById("play-btn").textContent = isMobile ? "Play" : "Play Flappy Bird";
  document.getElementById("tech-btn").textContent = isMobile ? "Technicals" : "Technical Details";
}


// Run on page load
updateButtonText();

// Listen for window resize
window.addEventListener("resize", updateButtonText);