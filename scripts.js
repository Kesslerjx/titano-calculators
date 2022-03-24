const RATE = 0.019176;
const DAY = "day";
const WEEK = "week";
const MONTH = "month";
const WEEK_MULTIPLIER = 7;
const MONTH_MULTIPLIER = 30;

//Get input fields
const balance = document.querySelector('#balance');
const frequency = document.querySelector('#frequency');
const frequencyType = document.querySelector('#frequency-type');
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

//Get results
const resultsDiv = document.querySelector('#results');
const resultsSummary = document.querySelector('#results-summary');

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

        //To determine when to sell coins and collect interest
        let counter = 1;
        let toCollect = 0;
        let collectionDay = parseInt(frequency.value) * getMultiplier();
        
        //Loop through the number of days
        for(i=0; i<parseInt(days.value); i++) {

            console.log(counter);
            console.log(collectionDay);

            console.log("Starting loop");
            console.log("Titano balance is " + totalBalance);

            //Get the amount of interest that will be earned during the day
            let dayInterest = totalBalance * RATE;

            console.log("Interest earned for the day is " + dayInterest);

            //Only collect interest based on the collectionDay
            //If not, add full interest to titano balance
            if(counter == collectionDay) {
                //Add interst to balance
                totalBalance += dayInterest;

                //Get interest to the collection
                toCollect += dayInterest;

                //Get the amount that the user will collect based on the percentage value they set
                toCollect *= (parseFloat(percentage.value) / 100);

                console.log("User will collect (before fee) " + toCollect);

                //Take collected amount from the totalBalance
                totalBalance -= toCollect;

                console.log("New titano balance is " + totalBalance);

                //Remove the sell fee from the amount collected
                toCollect = toCollect - (toCollect * (parseFloat(fee.value) / 100));

                console.log("User will collect (after fee) " + toCollect);

                //Add collected to the total value
                totalCollected += toCollect;

                //Update collected value
                collectedValue += (toCollect * parseFloat(price.value));

                //Reset counter
                counter = 1;
            } else {
                //Add interest earned to the amount the user will collect
                toCollect += dayInterest;

                //Add interst to balance
                totalBalance += dayInterest;

                console.log("New titano balance is " + totalBalance);

                //Add to counter
                counter++;
            }

        }

        //Build results summary
        let summary = `After ${daysValue} days you would have ${parseFloat(totalBalance.toFixed(2)).toLocaleString('en')} Titano in your wallet which would be worth around $${parseFloat((totalBalance * parseFloat(price.value)).toFixed(2)).toLocaleString('en')}. 
            You would have swapped ${parseFloat(totalCollected.toFixed(2)).toLocaleString('en')} Titano and pocketed around $${parseFloat(collectedValue.toFixed(2)).toLocaleString('en')} before taxes.`;
        
        //Set summary
        resultsSummary.textContent = summary;

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
        (typeof parseFloat(frequency.value) == "number" && parseInt(days.value) >= 1) &&
        (typeof parseFloat(days.value) == "number" && parseFloat(days.value) > 0) &&
        (typeof parseFloat(price.value) == "number" && parseFloat(price.value) > 0) &&
        (typeof parseFloat(fee.value) == "number" && parseFloat(fee.value) >= 0) &&
        //(typeof parseFloat(tax.value) == "number" && parseFloat(tax.value) >= 0) &&
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
    //taxValue = parseInt(tax.value);
    percentageValue = parseInt(percentage.value);
}

//Returns a multiplier based on what the user has chosen for their frequency type
function getMultiplier() {
    if (frequencyType.value == DAY) {
        return 1;
    } else if (frequencyType.value == WEEK) {
        return WEEK_MULTIPLIER;
    } else {
        return MONTH_MULTIPLIER;
    }
}