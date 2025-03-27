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


