function startJourney() {
  localStorage.setItem("journeyStart", Date.now());

  // loading internet...
  document.body.innerHTML = '<div class="center-container"><p>Loading internet...</p></div>';

  // loading pause
  setTimeout(function () {
    window.location.href = "distractions.html";
  }, 3500);
}

/* timer */
function startTimer() {
  if (!localStorage.getItem("journeyStart")) {
    localStorage.setItem("journeyStart", Date.now());
  }
}

function getElapsedTime() {
  var start = localStorage.getItem("journeyStart");
  if (!start) return Infinity;
  var now = Date.now();
  return Math.floor((now - parseInt(start, 10)) / 1000);
}

function restartJourney() {
  localStorage.removeItem("journeyStart");
  window.location.href = "index.html";
}

/* pop up */
function createPopupWindow(opt) {
  var popup = document.createElement("div");
  popup.className = "popupWindow";

  var header = document.createElement("div");
  header.className = "popupHeader";
  header.innerHTML = opt.title || "";

  var content = document.createElement("div");
  content.className = "popupContent";
  content.innerHTML = opt.content || "";

  popup.appendChild(header);
  popup.appendChild(content);

  popup.style.position = "absolute";
  popup.style.zIndex = 9999;
  popup.style.width = "380px";
  popup.style.maxWidth = "90vw";
  popup.style.maxHeight = "80vh";
  popup.style.overflowY = "auto";

  if (opt.rightOfBunny) {
    var bunny = document.getElementById("found-bunny");
    if (bunny) {
      try {
        var rect = bunny.getBoundingClientRect();
        var leftPos = rect.right + 20 + window.scrollX;
        var topPos = rect.top + window.scrollY;
        if (leftPos + 420 > window.scrollX + window.innerWidth) {
          leftPos = Math.max(20, window.scrollX + window.innerWidth - 440);
        }
        popup.style.left = leftPos + "px";
        popup.style.top = topPos + "px";
        popup.style.transform = "none";
      } catch (e) {
        popup.style.left = "50%";
        popup.style.top = "50%";
        popup.style.transform = "translate(-50%, -50%)";
      }
    } else {
      popup.style.left = "50%";
      popup.style.top = "50%";
      popup.style.transform = "translate(-50%, -50%)";
    }
  } else {
    popup.style.left = "50%";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%)";
  }

  document.body.appendChild(popup);

  if (!opt.stay) {
    popup.addEventListener("click", function () {
      if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
    });
  }

  return popup;
}

/* text fade */
function wait(ms) {
  return new Promise(function (res) { setTimeout(res, ms); });
}

async function showSequence(lines, element) {
  for (var i = 0; i < lines.length; i++) {
    element.textContent = lines[i];
    element.style.opacity = 1;
    await wait(2000);
    element.style.opacity = 0;
    await wait(1000);
  }
}

/* distractions page */
function initDistractions() {
  startTimer();
  try {
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
  } catch (e) { }

  var container = document.getElementById("distraction-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "distraction-container";
    document.body.appendChild(container);
  }
  container.style.position = "relative";

  var distractions = [
    "Let's catch up!",
    "NEW Nujabes Remix— LISTEN HERE!!",
    "BREAKING NEWS: G.R.R. Martin Finished Game of Thrones...",
    "FLASH SALE: Every Sweater You've Ever Wanted",
    "NEWS: World War 3?!",
    "Play: Paint the Roses Red",
    "Inbox (127,000 unread)",
    "BOB ROSS: Digital Art Series",
    "10-minute meals that will actually take you an hour.",
    "Job Application UPDATE",
    "Reminder: You forgot everything, actually.",
    "47 MISSED CALLS [MOM]",
    "Watch this ad to continue.",
    "Limited-time offer!",
    "You deserve a break!"
  ];

  var popupColors = [
    "#48104b", "#e1ffdb", "#c0ff39", "#398eff",
    "#4c52ae", "#efff39", "#b4064a", "#d88368"
  ];

  var pageHeight = 5000 * 3;
  container.style.height = pageHeight + "px";

  var maxPopups = 100;
  var createdPopups = 0;
  var existingPopups = []; 
  var bunnyAdded = false;

  function isOverlapping(x, y, w, h) {
    for (var i = 0; i < existingPopups.length; i++) {
      var p = existingPopups[i];
      if (x < p.left + p.width + 40 &&
          x + w + 40 > p.left &&
          y < p.top + p.height + 40 &&
          y + h + 40 > p.top) {
        return true;
      }
    }
    return false;
  }

  window.addEventListener("scroll", function () {
    var scrollBottom = window.scrollY + window.innerHeight;
    var spawnSpacing = 120;

    if (createdPopups < maxPopups && scrollBottom > (createdPopups * spawnSpacing)) {
      var attempts = 0;
      var width = 220 + Math.random() * 600; 
      var height = 120 + Math.random() * 520;  
      var left, top;

      do {
        left = Math.random() * Math.max(0, (window.innerWidth - width - 40));
        top = window.scrollY + Math.random() * (window.innerHeight * 0.9);
        attempts++;
      } while (isOverlapping(left, top, width, height) && attempts < 25);

      existingPopups.push({ left: left, top: top, width: width, height: height });

      var popup = document.createElement("div");
      popup.className = "popupWindow";

      var color = popupColors[Math.floor(Math.random() * popupColors.length)];
      popup.style.backgroundColor = color;

      var titleText = distractions[Math.floor(Math.random() * distractions.length)];
      var contentText = distractions[Math.floor(Math.random() * distractions.length)];

      popup.innerHTML = '<div class="popupHeader">' + titleText + '</div>' +
                        '<div class="popupContent">' + contentText + '</div>';

      popup.style.width = width + "px";
      popup.style.height = height + "px";
      popup.style.position = "absolute";
      popup.style.left = left + "px";
      popup.style.top = top + "px";

      popup.addEventListener("click", function (e) {
        if (!e.target.closest("button")) {
          window.location.href = "did-you-forget.html";
        }
      });

      container.appendChild(popup);

      (function (p) {
        setInterval(function () {
          var dx = (Math.random() - 0.5) * 6;
          var dy = (Math.random() - 0.5) * 6;
          var curTop = parseFloat(p.style.top) || 0;
          var curLeft = parseFloat(p.style.left) || 0;
          p.style.top = (curTop + dy) + "px";
          p.style.left = (curLeft + dx) + "px";
        }, 1400);
      })(popup);

      createdPopups++;
    }

    if (!bunnyAdded && (window.scrollY + window.innerHeight + 60 >= pageHeight)) {
      var bunnyContainer = document.createElement("div");
      bunnyContainer.className = "bunny-bottom-container";
      bunnyContainer.style.height = "140px"; 

      var bunny = document.createElement("img");
      bunny.src = "images/bunny.gif";
      bunny.alt = "Bunny GIF";
      bunny.className = "bunny-bottom";
      bunny.style.width = "100px";
      bunny.onclick = function () {
        window.location.href = "found.html";
      };

      bunnyContainer.appendChild(bunny);
      
      if (container.parentNode) {
        container.parentNode.appendChild(bunnyContainer);
      } else {
        document.body.appendChild(bunnyContainer);
      }

      bunnyAdded = true;
    }
  }); 
} 

/* timer */
var foundTimerInterval = null;

function startFoundTimer() {
  var disp = document.getElementById("timer-display");
  if (!disp) return;
  var start = localStorage.getItem("journeyStart");
  if (!start) return;

  function tick() {
    var now = Date.now();
    var elapsed = Math.floor((now - parseInt(start, 10)) / 1000);
    disp.textContent = elapsed + "s";
  }

  tick();
  if (foundTimerInterval) clearInterval(foundTimerInterval);
  foundTimerInterval = setInterval(tick, 1000);
}

function stopFoundTimer() {
  if (foundTimerInterval) {
    clearInterval(foundTimerInterval);
    foundTimerInterval = null;
  }
}

// stop if leaving
window.onbeforeunload = function () {
  stopFoundTimer();
};

