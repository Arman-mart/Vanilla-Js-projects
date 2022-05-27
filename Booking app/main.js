import { ElementFactory } from "./construcor.js";
import { cinemaState } from "./config.js";

const seatContainer = document.getElementById("seat-container");
const moviesSelect = document.getElementById("movies");
const state = JSON.parse(localStorage.getItem("movieState") || null);


function initSeats() {
  const factory = new ElementFactory();
  new Array(cinemaState.currentMovieState.seats.count)
    .fill(0)
    .map((el, idx) => {
      const initSeat = factory.create("div", "div", "seat");
      const div = initSeat.rend(seatContainer);
      console.log(div);
      const occupiedSeatsArray = cinemaState.currentMovieState.seats.occupiedSeats;
      if (occupiedSeatsArray.includes(idx)) {
        div.classList.add("occupied");
      }
    });
}

function initSelectOptions() {
  const factory = new ElementFactory();
  cinemaState.movies.map((option) => {
    let initOption = factory.create("option", "option", option.price);
    initOption.rend(movies, option.name);
  });
}

// function changeMovie(e) {
//   cinemaState.currentMovie = e.target.value;
//   const seats = document.querySelectorAll(".seat:not(.info-seat)");
//   Array.from(seats).map((seat) => {
//     seat.parentElement.removeChild(seat);
//   });
//   initSeats();
// }

function main(state, moviesSelect, seatContainer) {
  if (state) {
    cinemaState.currentMovie = state.currentMovie;
    cinemaState.movies = cinemaState.movies.map(
      ({ seats, ...rest }, index) => ({
        ...rest,
        seats: state.movies[index].seats,
      })
    );
  }

  function selectItem(ev, element) {
    ev.preventDefault();
    element.toggleClass("selected");
  }

  Array.from(seatContainer.childNodes).forEach((element) => {
    element.on("click", selectItem);
  });

  // movies.addEventListener("change", changeMovie);
  initSelectOptions();
  initSeats();
}

main(state, moviesSelect, seatContainer);
