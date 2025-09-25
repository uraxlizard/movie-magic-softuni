import Movie from "../models/Movie.js";
import { Types } from "mongoose";

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

    createMovie(movieData) {
        movieData.rating = Number(movieData.rating);

        return Movie.create(movieData);
    },

    async attachCast(movieId, castId) {
        if (!castId || castId === 'none' || !Types.ObjectId.isValid(castId)) {
            return;
        }

        return Movie.findByIdAndUpdate(movieId, { $addToSet: { casts: castId } });
    }
}