const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";   //This is the API link 

let dropdownSelects = document.querySelectorAll(" .dropdown select ");
let btn = document.querySelector(" form button ");
let fromCurr = document.querySelector(" .from select ");
let toCurr = document.querySelector(" .to select ");
let msg = document.querySelector(" .msg ");



//traversing in all selects 
for (let select of dropdownSelects) {
    for (let currCode in countryList) {
       let newOptions = document.createElement("option");
       newOptions.innerText = currCode;
       newOptions.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOptions.selected = true; 
        }    

        if (select.name === "to" && currCode === "INR") {
            newOptions.selected = true; 
        }

       select.append(newOptions);
    }

    select.addEventListener("change" , (evt) => {
        updateImages( evt.target );
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    
    //check the input currency 
    if (amtVal === "" || amount.value < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    //console.log(fromCurr.value.toLowerCase() , toCurr.value.toLowerCase());
    const URL =  `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);

    let data = await response.json();
    let rate = data[ toCurr.value.toLowerCase() ];
    
    let calculatedAmount = rate * amtVal;
    let finalAmount = calculatedAmount.toFixed(2); 
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


//Changing images
//select 1
let updateImages = ( element ) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];    //dynamic access
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});


//calling onload
window.addEventListener( "load" , () => {
    updateExchangeRate();
});
