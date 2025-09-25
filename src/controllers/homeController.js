import { Router } from "express";
import movieService from "../services/movieService.js";

const homeController = Router();

// Home page
homeController.get("/", async (req, res) => {
    const movies = await movieService.getAllMovies();
    res.render("home", { movies });
});

// About page
homeController.get("/about", (req, res) => {
    res.render("about");
});

export default homeController;