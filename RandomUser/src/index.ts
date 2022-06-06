const main = document.getElementById("main") as HTMLElement;
const addUserBtn = document.getElementById("add-user") as HTMLButtonElement;
const doubleBtn = document.getElementById("double") as HTMLButtonElement;
const showMillionairesBtn = document.getElementById("show-millionaires") as HTMLButtonElement;
const sortBtn = document.getElementById("sort") as HTMLButtonElement;
const calculateWealthBtn = document.getElementById("calculate-wealth") as HTMLButtonElement;

let DATA: Data[] = [];

type Data = {
  name: string;
  lastName: string;
  money: number;
};

interface IUserResponse {
  results: [
    {
      name: {
        first: string;
        last: string;
        title: string;
      };
    }
  ];
}

async function getRandomUser() {
  try {
    const res = await fetch(`https://randomuser.me/api`);
    const data: IUserResponse = await res.json();
    console.log(data)
    const { results } = data;
    
    const user = results[0].name;

    const newUser: Data = {
      name: `${user.first}`,
      lastName: `${user.last}`,
      money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
  } catch (e) {
    console.log("Error", e);
  }
}


function addData(obj: Data) {
  DATA.push(obj);
  updateDOM();
}

function updateDOM() {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  DATA.forEach((item) => {
    const element: HTMLElement = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name} ${item.lastName}</strong> ${item.money}$`;
    main.appendChild(element);
  });
}

function calculateWealth() {
  const wealth: number = DATA.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${wealth}$</strong></h3>`;
  main.appendChild(wealthEl);
}


function showMillionaires() {
    DATA = DATA.filter(user => user.money > 1000000);
    updateDOM();
  }

  function sortByRichest() {
    DATA.sort((a, b) => b.money - a.money);
    updateDOM();
  }

  function doubleMoney() {
    DATA = DATA.map(user => {
      return { ...user, money: user.money * 2 };
    });
  
    updateDOM();
  }

  getRandomUser();
  addUserBtn?.addEventListener('click', getRandomUser);
  doubleBtn?.addEventListener('click', doubleMoney);
  sortBtn?.addEventListener('click', sortByRichest);
  showMillionairesBtn?.addEventListener('click', showMillionaires);
  calculateWealthBtn?.addEventListener('click', calculateWealth);