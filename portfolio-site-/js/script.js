// --- MODAL LOGIC ---
const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeBtn = document.querySelector(".close");

aboutBtn.onclick = function() {
  aboutModal.style.display = "block";
};

closeBtn.onclick = function() {
  aboutModal.style.display = "none";
};

window.onclick = function(e) {
  if (e.target === aboutModal) {
    aboutModal.style.display = "none";
  }
};

// --- DRAGGABLE MODAL FUNCTION ---
makeDraggable(document.querySelector(".modal-content"));

function makeDraggable(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// --- DARK/LIGHT TOGGLE ---
const toggleButton = document.querySelector(".toggle-mode");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// --- TABS ---
const tabButtons = document.querySelectorAll(".tab-btn");
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    const tabName = btn.getAttribute("data-tab");
    document.getElementById(tabName).classList.add("active");
    window.scrollTo({ top: document.getElementById(tabName).offsetTop, behavior: "smooth" });
  });
});
