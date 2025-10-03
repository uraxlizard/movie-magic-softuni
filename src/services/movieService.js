import Movie from "../models/Movie.js";

export default {
    getAllMovies(filter = {}) {
        let query = Movie.find();

        if (filter.title) {
            query = query.find({ title: { $regex: filter.title, $options: 'i' } });
        }

        if (filter.genre) {
            query = query.find({ genre: { $regex: new RegExp(`^${filter.genre}$`), $options: 'i' } });
        }

        if (filter.year) {
            query = query.where('year').equals(filter.year);
        }

        return query;
    },

    getMovieOne(movieId) {
        return Movie.findById(movieId);
    },

    getMovieOneDetailed(movieId) {
        return this.getMovieOne(movieId).populate('casts');
    },

    createMovie(movieData, userId) {
        return Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            creator: userId,
        });
    },

    async attachCast(movieId, castId) {
        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
    },

    deleteMovie(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },

    editMovie(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData);
    }
}