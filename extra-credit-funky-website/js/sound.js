let song = document.querySelector("#song");
let song2 = document.querySelector("#song2");

let playBtn = document.querySelector("#play-button");
let playBtn2 = document.querySelector("#play-button-2");
let pauseBtn = document.querySelector("#pause-button");
let pauseBtn2 = document.querySelector("#pause-button-2");

playBtn.addEventListener("click", async () => {
  await Tone.start(); // unlock audio
  song.play();
});

playBtn2.addEventListener("click", () => {
  song2.play();
});

pauseBtn.addEventListener("click", () => {
  song.pause();
});

pauseBtn2.addEventListener("click", () => {
  song2.pause();
});

song.volume = 0.5;
song2.volume = 0.25;
