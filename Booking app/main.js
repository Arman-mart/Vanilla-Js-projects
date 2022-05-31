import { ElementFactory } from "./construcor.js";
import { cinemaState } from "./state.js";

const occupiedClass = "occupied";
const selectedClass = "selected";
const LOCAL_STORAGE_KEY = "movieState";
const seatContainer = document.getElementById("seat-container");
const moviesSelect = document.getElementById("movies");
const total = document.getElementById("total");
const count = document.getElementById("count");

const state = JSON.parse(localStorage.getItem("movieState") || null);

const factory = new ElementFactory();


function saveState() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cinemaState));
}

function initSeats() {
  const occupiedSeatsArray = cinemaState.currentMovieState.seats.occupiedSeats;
  const selectedSeatsArray = cinemaState.currentMovieState.seats.selectedSeats;

  seatContainer.innerHTML = "";

  new Array(cinemaState.currentMovieState.seats.count)
    .fill(0)
    .map((el, idx) => {
      const initSeat = factory.create(
        "div",
        {
          className: "seat",
          onclick: selectSeat,
        },
        []
      );
      el = initSeat.rend();
      seatContainer.appendChild(el);
      el.id = idx;

      if (occupiedSeatsArray.includes(idx)) {
        el.classList.add(occupiedClass);
      }

      if (selectedSeatsArray.includes(idx)) {
        el.classList.add(selectedClass);
      }
    });
}

function initSelectOptions() {
  cinemaState.movies.map((option, idx) => {
    const initOption = factory.create("option", { value: idx }, [option.name]);
    movies.appendChild(initOption.rend());
  });
}

function changeMovie(e) {
  cinemaState.currentMovie = e.target.value;
  initSeats();
  saveState();
  updateTotal();
}

function chooseSet(seat) {
  if (!seat.classList.contains(occupiedClass)) {
    if (seat.classList.contains(selectedClass)) {
      seat.classList.remove(selectedClass);
      console.log(seat.id)
      cinemaState.currentMovieState.seats.selectedSeats = cinemaState.currentMovieState.seats.selectedSeats.filter(el => el !== +seat.id);
       console.log(cinemaState.currentMovieState.seats.selectedSeats)
    } else {
      seat.classList.add(selectedClass);
      cinemaState.currentMovieState.seats.selectedSeats.push(+seat.id);
    }
  }
  saveState();
}

function selectSeat(e, seat) {
  chooseSet(e.target);
  saveState();
  updateTotal();
}

function updateTotal() {
  const selectedSeatsArray = cinemaState.currentMovieState.seats.selectedSeats;
  const {
    currentMovieState: {
      price,
    },
  } = cinemaState;
  total.innerText = `${price * selectedSeatsArray.length}$`;
  count.innerText = `${selectedSeatsArray.length}`;
}

function main(state, moviesSelect) {
  if (state) {
    cinemaState.movies = cinemaState.movies.map(
      ({ seats, ...rest }, index) => ({
        ...rest,
        seats: state.movies[index].seats,
      })
    );
    cinemaState.currentMovie = state.currentMovie || 0;
  }

  movies.addEventListener("change", changeMovie);
  initSelectOptions();
  initSeats();
  updateTotal();
  moviesSelect.value = state.currentMovie;
}

main(state, moviesSelect);
