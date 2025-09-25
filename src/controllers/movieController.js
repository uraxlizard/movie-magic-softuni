import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const movieData = req.body;
    await movieService.createMovie(movieData);
    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieOneDetailed(movieId);

    const ratingViewData = '&#x2605;'.repeat(Math.trunc(movie.rating));

    res.render('details', { movie, rating: ratingViewData });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAllMovies(filter);
    res.render('search', { movies, filter, pageTitle: 'Search Movies' });
});

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getMovieOne(movieId);
    const casts = await castService.getAllCasts({ excludes: movie.casts });

    res.render('casts/attach', { movie, casts });
});

movieController.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attachCast(movieId, castId);
    res.redirect(`/movies/${movieId}/details`);
});

export default movieController;