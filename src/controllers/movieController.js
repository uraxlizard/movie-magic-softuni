import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    if (req.isAuthenticated) {
        console.log('User is authenticated');
    }

    res.render('movies/create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const movieData = req.body;
    const userId = req.user.id;

    await movieService.createMovie(movieData, userId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieOneDetailed(movieId);

    const ratingViewData = '&#x2605;'.repeat(Math.trunc(movie.rating));

    res.render('movies/details', { movie, rating: ratingViewData });
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

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getMovieOne(movieId);

    if (!movie.creator?.equals(req.user.id)) {
        return res.redirect('/');
    }

    await movieService.deleteMovie(movieId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieOne(movieId);

    const categoriesViewData = getMovieCategoryViewData(movie.category);

    res.render('movies/edit', { movie, categories: categoriesViewData });
});

movieController.post('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    await movieService.editMovie(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);
});

function getMovieCategoryViewData(selectedCategory) {
    const categories = [
        { value: 'tv-show', label: 'TV Show' },
        { value: 'animation', label: 'Animation' },
        { value: 'movie', label: 'Movie' },
        { value: 'documentary', label: 'Documentary' },
        { value: 'short-film', label: 'Short Film' },
    ];

    const viewData = categories.map(category => ({ ...category, selected: selectedCategory === category.value ? 'selected' : '' }))

    return viewData;
}

export default movieController;