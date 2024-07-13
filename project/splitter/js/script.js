const tipButtonsNodeList = document.querySelectorAll('.tip-button');
const billInput = document.querySelector('.bill-input');
const numPeopleInput = document.querySelector('.people-input');
const tipPerPersonSpan = document.querySelector('.tip-per-person');
const totalPerPersonSpan = document.querySelector('.total-per-person');
const resetButton = document.querySelector('.reset-button');
const numPeopleError = document.querySelector('.people-error');
const customInput = document.querySelector('.tip-custom');
const peopleInputSection = document.querySelector('.people-input-section');
const billInputSection = document.querySelector('.bill-input-section');

const tipButtons = Array.prototype.slice.call(tipButtonsNodeList);

let billAmount = 0;
let tipPercent = 5;
let numPeople = 1;
let tipPerPerson = 0;
let totalPerPerson = 0;
let customValue = 0;

const tipBtnValues = [5, 10, 15, 25, 50, customValue];

const updateTip = () => {
    const tipDecimal = tipPercent / 100;
    const totalTip = tipDecimal * billAmount;
    const totalBillAfterTip = totalTip + billAmount;
    tipPerPerson = parseFloat(totalTip / numPeople).toFixed(2);
    totalPerPerson = parseFloat(totalBillAfterTip / numPeople).toFixed(2);
    tipPerPersonSpan.innerText = tipPerPerson;
    totalPerPersonSpan.innerText = totalPerPerson;
    resetButton.disabled = false;
};

customInput.addEventListener('blur', () => {
    if (customInput.value === '') {
        customValue = 0;
    } else {
        customValue = parseFloat(customInput.value);
    }
    tipBtnValues[5] = customValue;
    tipPercent = customValue;
    updateTip();
});

// resets all values to defaults and selects 5%
resetButton.addEventListener('click', () => {
    billAmount = 0;
    billInput.value = 0;
    numPeople = 1;
    numPeopleInput.value = 1;
    tipPerPerson = 0;
    totalPerPerson = 0;
    tipButtons[0].click();
    customValue = 0;
    customInput.value = '';
    tipBtnValues[5] = customValue;
    updateTip();
    resetButton.disabled = true;
});

// adds a listener to each tip % button that adjusts the tip % to that value
tipButtons.forEach((selectedTipBtn) => {
    selectedTipBtn.addEventListener('click', () => {
        tipButtons.forEach((tipBtn) => {
            tipBtn.classList.remove('tip-selected');
        });
        selectedTipBtn.classList.add('tip-selected');
        const index = tipButtons.indexOf(selectedTipBtn);
        const value = tipBtnValues[index];
        tipPercent = value;
        updateTip();
    });
});

billInput.addEventListener('focus', () => {
    billInputSection.classList.add('input-selected');
});

// fires when bill input is deselected
billInput.addEventListener('blur', () => {
    if (billInput.value !== '') {
        const value = parseFloat(billInput.value);
        const moneyValue = parseFloat(value.toFixed(2));
        billAmount = moneyValue;
        billInput.value = moneyValue;
        billInputSection.classList.remove('input-selected');
        updateTip();
    } else {
        // if NaN, treat it as 0
        billInputSection.classList.remove('input-selected');
        billInput.value = 0;
        billAmount = 0;
        updateTip();
    }
});

numPeopleInput.addEventListener('focus', () => {
    peopleInputSection.classList.add('input-selected');
});

// fires when numpeople input is deselected
numPeopleInput.addEventListener('blur', () => {
    if (numPeopleInput.value === '0' || numPeopleInput.value === '') {
        numPeopleError.style.display = 'inline';
        peopleInputSection.classList.add('error');
        peopleInputSection.classList.remove('input-selected');
        tipPerPerson = 0;
        totalPerPerson = 0;
        tipPerPersonSpan.innerText = tipPerPerson;
        totalPerPersonSpan.innerText = totalPerPerson;
    } else {
        numPeopleError.style.display = 'none';
        peopleInputSection.classList.remove('error');
        peopleInputSection.classList.remove('input-selected');
        if (numPeopleInput.value % 1 != 0) {
            numPeopleInput.value = Math.round(numPeopleInput.value);
        }
        numPeople = parseFloat(numPeopleInput.value);
        updateTip();
    }
});