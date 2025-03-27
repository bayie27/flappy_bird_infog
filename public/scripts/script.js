function onPlayClickGame() {
    let containerID = document.getElementById("container-id")
    containerID.classList.add("fade-out")

    setTimeout(() => {
        // Redirect to the game page
        window.location.href = "game.html"
    }, 250)
  }

  function onPlayClickTech() {
    let containerID = document.getElementById("container-id")
    containerID.classList.add("fade-out")

    setTimeout(() => {
        // Redirect to the technical aspects page
        window.location.href = "mechanics.html"
    }, 250)
  }

  function onPlayClickBack() {
    let containerID = document.getElementById("container-id")
    containerID.classList.add("fade-out")

    setTimeout(() => {
        // Redirect previous page
        window.location.href = "/"
    }, 250)
  }

  function updateButtonText() {
    const playButton = document.querySelector('.nav-button:nth-child(1)'); // First button
    const techButton = document.querySelector('.nav-button:nth-child(2)'); // Second button

    if (window.innerWidth <= 600) {
        playButton.textContent = "Play";
        techButton.textContent = "Technicals";
    } else {
        playButton.textContent = "Play Flappy Bird";
        techButton.textContent = "Technical Details";
    }
}

// Run the function on page load and on resize
window.addEventListener("DOMContentLoaded", updateButtonText);
window.addEventListener("resize", updateButtonText);



