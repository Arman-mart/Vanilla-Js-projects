import { ElementFactory } from "./construcor.js";
import { cinemaState } from "./state.js";

const occupiedClass = "occupied";
const selectedClass = "selected";
const seatContainer = document.getElementById("seat-container");
const moviesSelect = document.getElementById("movies");
const state = JSON.parse(localStorage.getItem("movieState") || null);

const factory = new ElementFactory();

function initSeats() {
  const occupiedSeatsArray = cinemaState.currentMovieState.seats.occupiedSeats;
  const selectedSeatsArray = cinemaState.currentMovieState.seats.selectedSeats;
  seatContainer.innerHTML = '';
  new Array(cinemaState.currentMovieState.seats.count)
    .fill(0)
    .map((el, idx) => {
      const initSeat = factory.create("div", {
         className: "seat",
         onclick: selectSeat,
      }, []);
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
    const initOption = factory.create(
        "option",
        { value: idx },
        [option.name]
    );
    movies.appendChild(initOption.rend());
  });
}

function changeMovie(e) {
  cinemaState.currentMovie = e.target.value;
  initSeats();
}

function chooseSet(seat) {
  if (!seat.classList.contains(occupiedClass)) {
    const { id } = seat.id;
    if (seat.classList.contains(selectedClass)) {
      seat.classList.remove(selectedClass);
      cinemaState.currentMovieState.seats.selectedSeats =
        cinemaState.currentMovieState.seats.selectedSeats.filter(
          (el) => el !== id
        );
    } else {
      seat.classList.add(selectedClass);
      cinemaState.currentMovieState.seats.selectedSeats.push(id);
    }
  }
}

function selectSeat(e, seat) {
  chooseSet(e.target);
}

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
