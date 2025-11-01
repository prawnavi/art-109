// toggle dark/light mode
let toggle = document.querySelector(".mode-toggle")
let icon = document.getElementById("toggle-icon")

toggle.addEventListener("click", function(){
  document.body.classList.toggle("dark")
  let darkMode = document.body.classList.contains("dark")
  
  if(darkMode){
    icon.src = "images/sunicon.png"
  } else {
    icon.src = "images/moonicon.png"
  }
})

console.log("theme toggle loaded")

