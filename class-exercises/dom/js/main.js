document.querySelector("#bg-coffee-shop").addEventListener("click", function () {
    document.querySelector("#bg-coffee-shop").style.visibility = "hidden";
    document.querySelector("#bg-gradient").style.visibility = "visible";
});

document.querySelector("#bg-gradient").addEventListener("click", function () {
    document.querySelector("#bg-gradient").style.visibility = "hidden";
    document.querySelector("#bg-home-office-bookshelf").style.visibility = "visible";
});

document.querySelector("#bg-home-office-bookshelf").addEventListener("click", function () {
    document.querySelector("#bg-home-office-bookshelf").style.visibility = "hidden";
    document.querySelector("#bg-home-office-city").style.visibility = "visible";
});

document.querySelector("#bg-home-office-city").addEventListener("click", function () {
    document.querySelector("#bg-home-office-city").style.visibility = "hidden";
    document.querySelector("#bg-home-office-studio").style.visibility = "visible";
});

document.querySelector("#bg-home-office-studio").addEventListener("click", function () {
    document.querySelector("#bg-home-office-studio").style.visibility = "hidden";
    document.querySelector("#bg-sunset-ocean").style.visibility = "visible";
});

document.querySelector("#bg-sunset-ocean").addEventListener("click", function () {
    document.querySelector("#bg-sunset-ocean").style.visibility = "hidden";
    // no next image, so it just hides
});

