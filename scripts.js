const RATE = 0.019176;

//Get input fields
const balance = document.querySelector('#balance');
const days = document.querySelector('#days');
const price = document.querySelector('#price');
const fee = document.querySelector('#fee');
const tax = document.querySelector('#tax');
const percentage = document.querySelector('#percentage');

//Get summary paragraphs
const totalBalanceParagraph = document.querySelector('#total-balance');
const totalValueParagraph = document.querySelector('#total-value');
const totalCollectedParagraph = document.querySelector('#total-collected');
const collectedValueParagraph = document.querySelector('#collected-value');

//Setup submit button
const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', submit);

//Setup reset button
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', reset);

////////////////
/* FUNCTIONS */
///////////////

function submit() {
    console.log("User is attempting to submit their form");

    //Parse inputs
    parseInputs()
    
    //Only continue if all inputs are valid
    if (checkInputs()) {

        //Variables to be used for calculations
        let totalBalance = balanceValue;
        let totalValue = 0;
        let totalCollected = 0;
        let collectedValue = 0;
        
        //Loop through the number of days
        for(i=0; i<parseInt(days.value); i++) {

            console.log("Starting loop");
            console.log("Titano balance is " + totalBalance);

            //Get the amount of interest that will be earned during the day
            let dayInterest = totalBalance * RATE;

            console.log("Interest earned for the day is " + dayInterest);

            //Get the amount that the user will collect based on the percentage value they set
            let toCollect = dayInterest * (parseFloat(percentage.value) / 100);

            console.log("User will collect " + toCollect);
            
            //Add interest - collected to the total balance
            totalBalance += (dayInterest - toCollect);

            console.log("New titano balance is " + totalBalance);

            //Remove the sell fee from the amount collected
            toCollect = toCollect - (toCollect * (parseFloat(fee.value) / 100));

            console.log("User will collect " + toCollect + " once the fee has been removed");

            //Add collected to the total value
            totalCollected += toCollect;

            //Update collected value
            collectedValue += (toCollect * parseFloat(price.value));
        }

        //Set results summary
        totalBalanceParagraph.textContent = totalBalance;
        totalValueParagraph.textContent = (totalBalance * parseFloat(price.value));
        totalCollectedParagraph.textContent = totalCollected;
        collectedValueParagraph.textContent = collectedValue;

    }
}

function reset() {
    console.log("User is resetting everything");
}

//Check each input to ensure they're valid
function checkInputs() {

    //Nothing can be negative
    //Balance, days, and price have to be greater than 0
    //Fee, tax, and percentage can = 0
    //All have to be typeof number
    if((typeof parseFloat(balance.value) == "number" && parseFloat(balance.value) > 0) &&
        (typeof parseFloat(days.value) == "number" && parseFloat(days.value) > 0) &&
        (typeof parseFloat(price.value) == "number" && parseFloat(price.value) > 0) &&
        (typeof parseFloat(fee.value) == "number" && parseFloat(fee.value) >= 0) &&
        (typeof parseFloat(tax.value) == "number" && parseFloat(tax.value) >= 0) &&
        (typeof parseFloat(percentage.value) == "number" && parseFloat(percentage.value) >= 0)) {

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