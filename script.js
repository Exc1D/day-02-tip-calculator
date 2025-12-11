const billAmountInput = document.getElementById("billAmount");
const tipPercentInput = document.getElementById("tipPercent");
const numPeopleInput = document.getElementById("numPeople");

const tipAmountDisplay = document.getElementById("tipAmount");
const amountPersonDisplay = document.getElementById("amountPerson");
const totalBillDisplay = document.getElementById("totalBill");

function calculate() {
  const billAmount = parseFloat(billAmountInput.value) || 0;
  const tipPercent = parseFloat(tipPercentInput.value) || 0;
  const numPeople = parseFloat(numPeopleInput.value) || 1;

  if (billAmount < 0) return;

  const tipAmount = billAmount * (tipPercent / 100);
  const totalBill = billAmount + tipAmount;
  const amountPerPerson = totalBill / numPeople;

  tipAmountDisplay.value = tipAmount.toFixed(2);
  amountPersonDisplay.value = amountPerPerson.toFixed(2);
  totalBillDisplay.value = totalBill.toFixed(2);
}

billAmountInput.addEventListener("input", calculate);
tipPercentInput.addEventListener("input", calculate);
numPeopleInput.addEventListener("input", calculate);
