const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat:not(.info-seat)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movie = document.getElementById("movie");
const moviePrice = document.getElementById("movie-price");

const movieData = {
  movies: {
    "Avengers:Endgame": { 
      price: 8,
      occupiedSeats: [8, 7, 6, 0, 13, 14, 15],
      selectedSeats: [],
    },
    Joker: {
      price: 12,
      occupiedSeats: [9, 8, 7],
      selectedSeats: [],
    },
    "Toy story 4": {
      price: 10,
      occupiedSeats: [1, 2, 3, 4, 5, 6, 14, 32],
      selectedSeats: [],
    },
    "The Lion King": {
      price: 13,
      occupiedSeats: [32, 24, 11, 1, 33, 34, 12],
      selectedSeats: [],
    },
  },
};

function saveState(){
  localStorage
}

const getSeatsInfo = (seats = [], movieData = {}, movieName = "") => {
  const selectedSeatsArray = movieData.movies[movieName].selectedSeats;
  const occupiedSeatsArray = movieData.movies[movieName].occupiedSeats;
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

const updateSeatsInfo = (movieData = {}, movieName = "") => {
  const selectedSeatsArray = movieData.movies[movieName].selectedSeats;
  const occupiedSeatsArray = movieData.movies[movieName].occupiedSeats;

  selectedSeatsArray.forEach((el) => {
    seats[el].classList.add("selected");
  });
  occupiedSeatsArray.forEach((el) => {
    seats[el].classList.add("occupied");
  });
  moviePrice.innerText = `${movieData.movies[movieName].price}$`;
  updateTotalandCount(movieData, movieName);
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

const updateTotalandCount = (movieData = {}, movieName = "") => {
  const selectedSeatsArray = movieData.movies[movieName].selectedSeats;
  const ticketPrice = movieData.movies[movieName].price;
  count.innerText = selectedSeatsArray.length;
  total.innerText = selectedSeatsArray.length * ticketPrice;
};

movie.addEventListener("change", (e) => {
  Array.from(seats).map((el) => el.classList.remove("occupied", "selected"));
  const movieName = e.target.options[e.target.selectedIndex].text;
  updateSeatsInfo(movieData, movieName);
});

container.addEventListener("click", (event) => {
  const movieName = movie.options[movie.selectedIndex].text;
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
  }

  if (movieName !== "Choose here") {
    getSeatsInfo(seats, movieData, movieName);
    updateTotalandCount(movieData, movieName);
  }
});
