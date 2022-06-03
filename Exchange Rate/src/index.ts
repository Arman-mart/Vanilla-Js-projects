const firstCurrency = document.getElementById(
  "currency-one"
) as HTMLSelectElement | null;
const amountOne = document.getElementById("amount-one") as HTMLInputElement;
const secondCurrency = document.getElementById(
  "currency-two"
) as HTMLSelectElement | null;

const amountTwo = document.getElementById("amount-two") as HTMLInputElement;
const rate = document.getElementById("rate") as HTMLDivElement | null;
const swap = document.getElementById("swap") as HTMLButtonElement | null;
const url = "https://v6.exchangerate-api.com/v6/3483800f150c178b40e019f4/latest/USD";

interface IRateResponse {
  conversion_rates: {
    [key: string]: number;
  };
}

const createOptions = async (url: string) => {
  try {
    const response = await fetch(url);
    const data: IRateResponse = await response.json();
    const { conversion_rates } = data;
    Object.entries<number>(conversion_rates).forEach(([key, val]) => {
      const optionForFirst = new Option(key, key);
      const optionForSeCond = new Option(key, key);
      firstCurrency?.add(optionForFirst);
      secondCurrency?.add(optionForSeCond);
    });
  } catch (error) {
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

    if (rate && amountOne && amountTwo) {
      const convertedValue = (conversion_rate * +amountOne.value).toFixed(2);
      rate.innerText = `${amountOne.value} ${baseUnit} = ${convertedValue} ${secondUnit}`;
      amountTwo.value = convertedValue;
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

const swapCurrency = () => {
  if (firstCurrency && secondCurrency && rate) {
    [firstCurrency.value, secondCurrency.value] = [secondCurrency.value, firstCurrency.value];
    [amountOne.value, amountTwo.value] = [amountTwo.value, amountOne.value];
  }
};

amountOne?.addEventListener("input", convert);
firstCurrency?.addEventListener("change", convert);
amountTwo?.addEventListener("input", convert);
secondCurrency?.addEventListener("change", convert);

swap?.addEventListener("click", swapCurrency);
createOptions(url);
