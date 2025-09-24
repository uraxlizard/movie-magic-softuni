import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const movie = req.body;
    await movieService.createMovie(movie);
    res.redirect('/');
});

movieController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const movie = await movieService.getMovieById(id);

    const rating = '&#x2605;'.repeat(Math.trunc(movie.rating));

    res.render('details', { movie, rating });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAllMovies(filter);
    res.render('search', { movies });
});

export default movieController;