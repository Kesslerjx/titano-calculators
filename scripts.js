//Get input fields
const balance = document.querySelector('#balance');
const days = document.querySelector('#days');
const price = document.querySelector('#price');
const fee = document.querySelector('#fee');
const tax = document.querySelector('#tax');
const percentage = document.querySelector('#percentage');

//Create value variables
let balanceValue = parseInt(balance.value);
let daysValue = parseInt(days.value);
let priceValue = parseInt(price.value);
let feeValue = parseInt(fee.value);
let taxValue = parseInt(tax.value);
let percentageValue = parseInt(percentage.value);

//Setup submit button
const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', submit);


/* FUNCTIONS */

function submit() {
    console.log("User is attempting to submit their form");

    //Parse inputs
    parseInputs()
    
    //Only continue if all inputs are valid
    if (checkInputs()) {
        
    }
}

//Check each input to ensure they're valid
function checkInputs() {
    //Nothing can be negative
    //Balance, days, and price have to be greater than 0
    //Fee, tax, and percentage can = 0
    //All have to be typeof number
    if((typeof balanceValue == "number" && balanceValue > 0) &&
        (typeof daysValue == "number" && daysValue > 0) &&
        (typeof priceValue == "number" && priceValue > 0) &&
        (typeof feeValue == "number" && feeValue >= 0) &&
        (typeof taxValue == "number" && taxValue >= 0) &&
        (typeof percentageValue == "number" && percentageValue >= 0)) {

            console.log("Inputs are valid, good for submission")
            return true;
    } else {
        console.log("Inputs are invalid")
        return false;
    }
}

//Parses all of the inputs to numbers
function parseInputs() {
    balanceValue = parseInt(balance.value);
    daysValue = parseInt(days.value);
    priceValue = parseInt(price.value);
    feeValue = parseInt(fee.value);
    taxValue = parseInt(tax.value);
    percentageValue = parseInt(percentage.value);
}