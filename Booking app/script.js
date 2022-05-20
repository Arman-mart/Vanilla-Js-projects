const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat:not(.info-seat)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movie = document.getElementById("movie");


const movieData = {
  movies: {
    "Avengers:Endgame": {
      price: 8,
      occupiedSeatsId: [8, 7, 6, 0, 13, 14, 15],
      selectedSeatsId: [],
    },
    "Joker": {
      price: 12,
      occupiedSeatsId: [9, 8, 7],
      selectedSeatsId: [],
    },
    "Toy story 4": {
      price: 10,
      occupiedSeatsId: [1, 2, 3, 4, 5, 6, 14, 32],
      selectedSeatsId: [],
    },
    "The Lion King": {
      price: 13,
      occupiedSeatsId: [32, 24, 11, 1, 33, 34, 12],
      selectedSeatsId: [],
    },
  },
};

const getSeatsInfo = (seats = [], movieData = {}, movieName = "") => {
  const selectedSeatsArray =  movieData.movies[movieName].selectedSeatsId;
  const occupiedSeatsArray = movieData.movies[movieName].occupiedSeatsId;
  seats.forEach((seat, idx) => {
    if (
      seat.classList.contains("selected") &&
      !selectedSeatsArray.includes(idx)
    ) {
      selectedSeatsArray.push(idx);
    } else if (
      seat.classList.contains("occupied") &&
      !occupiedSeatsArray.includes(idx)
    ) {
      occupiedSeatsArray.push(idx);
    } else {
      selectedSeatsArray.splice(idx);
    }
  });
};

const updateSeatsInfo = (movieData, movieName) => {
  const selectedSeatsArray =  movieData.movies[movieName].selectedSeatsId;
  const occupiedSeatsArray = movieData.movies[movieName].occupiedSeatsId;
  selectedSeatsArray.forEach((el) => {
    seats[el].classList.add("selected");
  });
  occupiedSeatsArray.forEach((el) => {
    seats[el].classList.add("occupied");
  });
};

const populateUi = (movieData = {}) => {
  const entries = Object.entries(movieData.movies);
  const options = entries.map(([name, val]) => {
    const option = document.createElement("option");
    option.innerText = `${name}`;
    option.value = val.price;
    return option;
  });
  options.forEach((op) => movie.appendChild(op));
};

populateUi(movieData);

movie.addEventListener("change", (e) => {
  Array.from(seats).map((el) => el.classList.remove("occupied", "selected"));
  const movieName = e.target.options[e.target.selectedIndex].text;
  updateSeatsInfo(movieData, movieName);
});

container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
  }
  const movieName = movie.options[movie.selectedIndex].text
  getSeatsInfo(seats, movieData, movieName);
});
