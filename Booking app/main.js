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
let selectedSeatsArray;
let occupiedSeatsArray;

function saveState() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cinemaState));
}

function initSeats() {
   occupiedSeatsArray = cinemaState.currentMovieState.seats.occupiedSeats;
   selectedSeatsArray = cinemaState.currentMovieState.seats.selectedSeats;

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
      cinemaState.currentMovieState.seats.selectedSeats.filter(
        (el) => el !== seat.id
      );
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

function updateTotal(){
    const selectedCount = selectedSeatsArray.length;
    const price = cinemaState.currentMovieState.price;
    count.innerText = `${selectedCount}`;
    total.innerText = ` ${price * selectedCount}$`
}

function main(state, moviesSelect, seatContainer) {
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
  saveState();
  updateTotal();
  moviesSelect.value = state.currentMovie;
}


main(state, moviesSelect, seatContainer);
