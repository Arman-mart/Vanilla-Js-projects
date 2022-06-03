"use strict";
const firstCurrency = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const secondCurrency = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");
const url = "https://v6.exchangerate-api.com/v6/3483800f150c178b40e019f4/latest/USD";
const createOptions = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const { conversion_rates } = data;
        Object.entries(conversion_rates)
            .forEach(([key]) => {
            const optionForFirst = new Option(key, key);
            const optionForSeCond = new Option(key, key);
            firstCurrency?.add(optionForFirst);
            secondCurrency?.add(optionForSeCond);
        });
    }
    catch (error) {
        console.log("error ", error);
    }
};
const convert = async () => {
    const baseUnit = firstCurrency?.value;
    const secondUnit = secondCurrency?.value;
    const url = `https://v6.exchangerate-api.com/v6/3483800f150c178b40e019f4/pair/${baseUnit}/${secondUnit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const { conversion_rate } = data;
        const convertedValue = (conversion_rate * +amountOne.value).toFixed(2);
        rate.innerText = `${amountOne.value} ${baseUnit} = ${convertedValue} ${secondUnit}`;
        amountTwo.value = convertedValue;
    }
    catch (error) {
        console.log("error: ", error);
    }
};
const swapCurrency = () => {
    [firstCurrency.value, secondCurrency.value] = [secondCurrency.value, firstCurrency.value];
    [amountOne.value, amountTwo.value] = [amountTwo.value, amountOne.value];
};
amountOne?.addEventListener("input", convert);
firstCurrency?.addEventListener("change", convert);
amountTwo?.addEventListener("input", convert);
secondCurrency?.addEventListener("change", convert);
swap?.addEventListener("click", swapCurrency);
createOptions(url);
