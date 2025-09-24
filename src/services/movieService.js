import Movie from "../models/Movie.js";

export default {
    getAllMovies(filter = {}) {
        return Movie.find(filter);
    },
    getMovieById(id) {
        return Movie.findOne({ _id: id });
    },
    createMovie(movie) {
        movie.rating = Number(movie.rating);
        const newMovie = new Movie(movie);
        return newMovie.save();
    },
    updateMovie(id, movie) {
        const existingMovie = this.getMovieById(id);
        if (!existingMovie) {
            throw new Error("Movie not found");
        }
        Object.assign(existingMovie, movie);
        movie.rating = Number(movie.rating);
        const updatedMovie = new Movie(existingMovie);
        return updatedMovie.save();
    },
    deleteMovie(id) {
        const existingMovie = this.getMovieById(id);
        if (!existingMovie) {
            throw new Error("Movie not found");
        }
        return existingMovie.delete();
    }
}