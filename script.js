const billAmountInput = document.getElementById("billAmount");
const tipAmountDisplay = document.getElementById("tipAmount");
const amountPersonDisplay = document.getElementById("amountPerson");
const totalBillDisplay = document.getElementById("totalBill");

let tipPercent = 18;
let numPeople = 1;

function calculate() {
  const billAmount = parseFloat(billAmountInput.value) || 0;
  const tipAmount = billAmount * (tipPercent / 100);
  const totalBill = billAmount + tipAmount;
  const amountPerPerson = totalBill / numPeople;

  tipAmountDisplay.value = tipAmount.toFixed(2);
  amountPersonDisplay.value = amountPerPerson.toFixed(2);
  totalBillDisplay.value = totalBill.toFixed(2);
}

function initCarousel(pickerId, callback) {
  const picker = document.getElementById(pickerId);
  const container = picker.querySelector('.carousel-container');
  const items = picker.querySelectorAll('.carousel-item');
  
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function handleStart(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  }

  function handleMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    currentX = (e.type === 'mousemove' ? e.clientX : e.touches[0].clientX) - startX;
  }

  function handleEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const activeItem = picker.querySelector('.carousel-item.active');
    const activeIndex = Array.from(items).indexOf(activeItem);
    let newIndex = activeIndex;
    
    if (currentX > 30 && activeIndex > 0) newIndex--;
    else if (currentX < -30 && activeIndex < items.length - 1) newIndex++;
    
    items.forEach(item => item.classList.remove('active'));
    items[newIndex].classList.add('active');
    callback(items[newIndex].dataset.value);
    
    currentX = 0;
  }

  picker.addEventListener('mousedown', handleStart);
  picker.addEventListener('mousemove', handleMove);
  picker.addEventListener('mouseup', handleEnd);
  picker.addEventListener('touchstart', handleStart);
  picker.addEventListener('touchmove', handleMove);
  picker.addEventListener('touchend', handleEnd);
  
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      callback(item.dataset.value);
    });
  });
}

initCarousel('tipPercentPicker', (value) => {
  tipPercent = parseFloat(value);
  calculate();
});

initCarousel('numPeoplePicker', (value) => {
  numPeople = parseFloat(value);
  calculate();
});

billAmountInput.addEventListener("input", calculate);
calculate();