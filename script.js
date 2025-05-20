// Dora Birthday Website — Interactivity & Effects

// Elements
const startBtn = document.getElementById('start-btn');
const homeSection = document.getElementById('home-section');
const gameSection = document.getElementById('game-section');
const musicAudio = document.getElementById('dora-music');
const musicToggle = document.getElementById('music-toggle');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resultPopup = document.getElementById('result-popup');
const playAgainBtn = document.getElementById('play-again-btn');
const yeayySound = document.getElementById('yeayy-sound');
const confettiCanvas = document.getElementById('confetti-canvas');

let confettiCtx, confettiPieces = [];
let confettiAnimation;

// -- Music Autoplay & Toggle --
function playMusic() {
  musicAudio.volume = 0.35;
  musicAudio.play().catch(()=>{});
  musicToggle.classList.add('active');
  musicToggle.textContent = '🔊';
}
function pauseMusic() {
  musicAudio.pause();
  musicToggle.classList.remove('active');
  musicToggle.textContent = '🔇';
}
musicToggle.addEventListener('click', () => {
  if (musicAudio.paused) playMusic();
  else pauseMusic();
});
// Try auto start (mobile browsers may block)
window.addEventListener('DOMContentLoaded', () => setTimeout(playMusic, 400));

// -- Page Navigation --
startBtn.addEventListener('click', () => {
  homeSection.style.display = 'none';
  gameSection.style.display = 'block';
  setTimeout(()=>window.scrollTo(0,0), 120);
});

// -- Game Logic --
choiceBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    if (btn.dataset.correct === "true") {
      showPopup();
      triggerConfetti();
    } else {
      btn.classList.add('wrong');
      setTimeout(()=>btn.classList.remove('wrong'), 700);
    }
  });
});

function showPopup() {
  resultPopup.style.display = 'block';
  yeayySound.currentTime = 0;
  yeayySound.play();
}
function hidePopup() {
  resultPopup.style.display = 'none';
}
playAgainBtn.addEventListener('click', () => {
  hidePopup();
  stopConfetti();
});

// -- Confetti Animation --
function randomColor() {
  const colors = ['#ffd700','#ff80ab','#80d6ff','#fcb69f','#4e148c','#e66024','#fff'];
  return colors[Math.floor(Math.random()*colors.length)];
}
function triggerConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiCtx = confettiCanvas.getContext('2d');
  confettiPieces = [];
  for(let i=0;i<100;i++) {
    confettiPieces.push({
      x: Math.random()*confettiCanvas.width,
      y: Math.random()*-confettiCanvas.height,
      w: 8 + Math.random()*6,
      h: 14 + Math.random()*8,
      color: randomColor(),
      speed: 2 + Math.random()*4,
      angle: Math.random()*2*Math.PI,
      rotate: Math.random()*2*Math.PI
    });
  }
  confettiCanvas.style.display = 'block';
  confettiAnimation = requestAnimationFrame(drawConfetti);
}
function drawConfetti() {
  if(!confettiCtx) return;
  confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiPieces.forEach(cf => {
    confettiCtx.save();
    confettiCtx.translate(cf.x, cf.y);
    confettiCtx.rotate(cf.rotate);
    confettiCtx.fillStyle = cf.color;
    confettiCtx.fillRect(-cf.w/2, -cf.h/2, cf.w, cf.h);
    confettiCtx.restore();
    cf.y += cf.speed;
    cf.rotate += 0.03;
    if(cf.y > confettiCanvas.height) cf.y = -20;
  });
  confettiAnimation = requestAnimationFrame(drawConfetti);
}
function stopConfetti() {
  cancelAnimationFrame(confettiAnimation);
  if(confettiCtx) confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiCanvas.style.display = 'none';
}

// Responsive canvas
window.addEventListener('resize', () => {
  if (confettiCanvas.style.display === 'block') {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
});
