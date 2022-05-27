export const cinemaState = {
    currentMovie: 0,
    movies: [
      {
        name: `Avengers: Endgame ($10)`,
        price: 10,
        seats: {
          count: 48,
          occupiedSeats: [4, 5, 6, 7],
          selectedSeats: [],
        },
      },
      {
        name: `Joker ($12)`,
        price: 12,
        seats: {
          count: 16,
          occupiedSeats: [8, 9, 10, 11],
          selectedSeats: [],
        },
      },
      {
        name: `Toy Story 4 ($8)`,
        price: 8,
        seats: {
          count: 50,
          occupiedSeats: [12, 13, 14, 15],
          selectedSeats: [],
        },
      },
      {
        name: `The Lion King ($9)`,
        price: 6,
        seats: {
          count: 32,
          occupiedSeats: [16, 17, 18, 19],
          selectedSeats: [],
        },
      },
    ],
    get currentMovieState() {
      return this.movies[this.currentMovie];
    },
  };