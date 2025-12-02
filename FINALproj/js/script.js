/* dialogue page 1 */
if (location.pathname.includes("dialogue1.html")) {
    setTimeout(() => {
        const btn = document.getElementById("beginBtn");
        btn.style.display = "block";
        btn.onclick = () => location = "housepage.html";
    }, 3500);
}

/* house page */
if (location.pathname.includes("housepage.html")) {
    const house = document.getElementById("house");
    house.onclick = () => {
        location = "kitchenpage.html";
    };
}

/* kitchen popups */
if (location.pathname.includes("kitchenpage.html")) {
    let collected = 0;
    const items = document.querySelectorAll(".kitchen-item");

    const popup = document.getElementById("popup");
    const img = document.getElementById("popup-img");
    const text = document.getElementById("popup-text");
    const nextBtn = document.getElementById("nextBtn");

    items.forEach(item => {
        item.onclick = () => {
            collected++;
            item.style.opacity = 0.4;  
            item.style.pointerEvents = "none";

            img.src = item.dataset.img;
            text.textContent = item.dataset.desc;
            popup.style.display = "block";

            if (collected === items.length) {
                nextBtn.style.display = "block";
            }
        };
    });

    document.getElementById("popup-close").onclick = () => {
        popup.style.display = "none";
    };
}

/* kitchen intro popup */
if (location.pathname.includes("kitchenpage.html")) {
    const intro = document.getElementById("kitchen-intro");
    const introClose = document.getElementById("intro-close");

    introClose.onclick = () => {
        intro.style.display = "none";
    };
}




