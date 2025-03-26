function onPlayClickGame() {
    let containerID = document.getElementById("container-id")
    containerID.classList.add("fade-out")

    setTimeout(() => {
        // Redirect to the game page
        window.location.href = "game.html"
    }, 500)
  }

  function onPlayClickTech() {
    let containerID = document.getElementById("container-id")
    containerID.classList.add("fade-out")

    setTimeout(() => {
        // Redirect to the technical aspects page
        window.location.href = "mechanics.html"
    }, 500)
  }

  function onPlayClickBack() {
    let containerID = document.getElementById("container-id")
    containerID.classList.add("fade-out")

    setTimeout(() => {
        // Redirect to the technical aspects page
        window.location.href = "/"
    }, 500)
  }


