const container = document.querySelector(".container");
const seats = document.getElementsByClassName("seat");
const movies = document.getElementById("movie");

container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
  }
});

movies.addEventListener("change", () => {
  Array.from(seats).map((el) => el.classList.remove("occupied"));

  for (let i = 0; i < 15; i++) {
    const randomSeat = Math.floor(Math.random() * seats.length);
    seats[randomSeat].classList.add("occupied");
  }
});

