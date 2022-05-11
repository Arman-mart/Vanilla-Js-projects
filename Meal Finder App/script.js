const search = document.querySelector(".search");
const submitBtn = document.querySelector(".search-button");
const randomBtn = document.querySelector(".random-button");
const resultHeading = document.querySelector(".result-heading");
const mealsEl = document.querySelector(".meals");
const aboutMeal = document.querySelector(".about-meal");

function searchMeal(event) {
  event.preventDefault();
  const element = search.value;
  aboutMeal.innerHTML = "";

  if (element.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${element}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${element}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>There are no search results. Try again!</h2>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
                <div class="meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                  <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                  </div>
                </div>
              `
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    resultHeading.innerHTML = `<h2>Please enter a search term<h2>`;
  }
}

function getRandomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  aboutMeal.innerHTML = `
      <div class="about-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="about-meal-info">
          ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
          ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main-info">
          <p>${meal.strInstructions}</p>
          <h2>Ingredients</h2>
          <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;

  aboutMeal.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

submitBtn.addEventListener("click", searchMeal);
randomBtn.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    }
    return false;
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
