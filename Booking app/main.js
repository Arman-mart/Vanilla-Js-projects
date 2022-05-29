import { ElementFactory } from "./construcor.js";
import { cinemaState } from "./config.js";

const seatContainer = document.getElementById("seat-container");
const moviesSelect = document.getElementById("movies");
const state = JSON.parse(localStorage.getItem("movieState") || null);

function initSeats() {
  const occupiedSeatsArray =
        cinemaState.currentMovieState.seats.occupiedSeats;
        const selectedSeatsArray =
        cinemaState.currentMovieState.seats.selectedSeats;
  const factory = new ElementFactory();
  new Array(cinemaState.currentMovieState.seats.count)
    .fill(0)
    .map((el, idx) => {
      const initSeat = factory.create("div", "div", "seat");
      el = initSeat.rend(seatContainer);
      selectedSeatsArray.push(idx)
      if (occupiedSeatsArray.includes(idx)) {
        el.classList.add("occupied");
      }
    });
}

function initSelectOptions() {
  const factory = new ElementFactory();
  cinemaState.movies.map((option, idx) => {
    let initOption = factory.create("option", "option", idx);
    initOption.rend(movies, option.name);
  });
}

function changeMovie(e) {
  cinemaState.currentMovie = e.target.value;
  const seats = document.querySelectorAll(".seat:not(.info-seat)");
  Array.from(seats).map((seat) => {
    seat.parentElement.removeChild(seat);
  });
  initSeats();
}

function chooseSeat(event) {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    console.log(event.target)
    cinemaState.currentMovieState.seats.selectedSeats.push(event.target);
  }
  //else{
  //  cinemaState.currentMovieState.seats.selectedSeats.filter(el => el !== id);
  // }
}

seatContainer.addEventListener("click", (event) => {
  chooseSeat(event);
});

function main(state, moviesSelect, seatContainer) {
  // if (state) {
  //   cinemaState.currentMovie = state.currentMovie;
  //   cinemaState.movies = cinemaState.movies.map(
  //     ({ seats, ...rest }, index) => ({
  //       ...rest,
  //       seats: state.movies[index].seats,
  //     })
  //   );
  // }

  movies.addEventListener("change", changeMovie);
  initSelectOptions();
  initSeats();
}

main(state, moviesSelect, seatContainer);
