import { Router } from "express";

import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";

const router = Router();
router.use(homeController);
router.use('/movies', movieController);

// 404
router.get('/*splat', (req, res) => {
    res.render('404');
});

export default router;