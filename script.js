const billAmountInput = document.getElementById("billAmount");
const tipAmountDisplay = document.getElementById("tipAmount");
const amountPersonDisplay = document.getElementById("amountPerson");
const totalBillDisplay = document.getElementById("totalBill");
const resetBtn = document.getElementById("resetBtn");
const tipSlider = document.getElementById("tipSlider");
const tipDisplay = document.getElementById("tipDisplay");
const splitSlider = document.getElementById("splitSlider");
const splitDisplay = document.getElementById("splitDisplay");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

let tipPercent = 15;
let numPeople = 2;
let confettiParticles = [];
let animationId;
let lastTipPercent = 15;

function calculate() {
  const billAmount = parseFloat(billAmountInput.value) || 0;

  if (billAmount < 0) return;

  const tipAmount = billAmount * (tipPercent / 100);
  const totalBill = billAmount + tipAmount;
  const amountPerPerson = totalBill / numPeople;

  tipAmountDisplay.value = tipAmount.toFixed(2);
  amountPersonDisplay.value = amountPerPerson.toFixed(2);
  totalBillDisplay.value = totalBill.toFixed(2);
}

billAmountInput.addEventListener("input", calculate);

// Confetti Animation System
class ConfettiParticle {
  constructor(x, y, color, velocity, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.size = size;
    this.opacity = 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += 0.3; // gravity
    this.opacity -= 0.005;
    this.rotation += this.rotationSpeed;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function createConfetti(intensity) {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c', '#c44569', '#f8b500', '#a29bfe'];
  const particleCount = intensity;
  
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * confettiCanvas.width;
    const y = -20;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocity = {
      x: (Math.random() - 0.5) * 8,
      y: Math.random() * -10 - 5
    };
    const size = Math.random() * 8 + 4;
    
    confettiParticles.push(new ConfettiParticle(x, y, color, velocity, size));
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  confettiParticles = confettiParticles.filter(particle => {
    particle.update();
    particle.draw();
    return particle.opacity > 0 && particle.y < confettiCanvas.height;
  });
  
  if (confettiParticles.length > 0) {
    animationId = requestAnimationFrame(animateConfetti);
  }
}

function triggerConfetti(percentage) {
  let intensity;
  if (percentage === 30) {
    intensity = 150;
    createConfetti(intensity);
    setTimeout(() => createConfetti(75), 200);
    setTimeout(() => createConfetti(50), 400);
  } else if (percentage === 25) {
    intensity = 100;
    createConfetti(intensity);
  } else if (percentage === 20) {
    intensity = 50;
    createConfetti(intensity);
  }
  
  if (intensity) {
    animateConfetti();
  }
}

function reset() {
  billAmountInput.value = "";
  tipPercent = 15;
  numPeople = 2;
  tipSlider.value = 15;
  splitSlider.value = 2;
  tipDisplay.textContent = "15";
  splitDisplay.textContent = "2";
  tipAmountDisplay.value = "";
  amountPersonDisplay.value = "";
  totalBillDisplay.value = "";
  lastTipPercent = 15;
  confettiParticles = [];
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}

resetBtn.addEventListener("click", reset);

// Initialize canvas
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

tipSlider.addEventListener("input", (e) => {
  const newTipPercent = parseFloat(e.target.value);
  tipPercent = newTipPercent;
  tipDisplay.textContent = e.target.value;
  
  // Trigger confetti when reaching thresholds
  if (newTipPercent === 20 && lastTipPercent !== 20) {
    triggerConfetti(20);
  } else if (newTipPercent === 25 && lastTipPercent !== 25) {
    triggerConfetti(25);
  } else if (newTipPercent === 30 && lastTipPercent !== 30) {
    triggerConfetti(30);
  }
  
  lastTipPercent = newTipPercent;
  calculate();
});

splitSlider.addEventListener("input", (e) => {
  numPeople = parseFloat(e.target.value);
  splitDisplay.textContent = e.target.value;
  calculate();
});
