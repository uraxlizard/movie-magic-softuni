import { Router } from "express";

import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";
import castController from "./controllers/castController.js";

const router = Router();

router.use(homeController);
router.use('/movies', movieController);
router.use('/casts', castController);

// 404
router.get('/*splat', (req, res) => {
    res.render('404');
});

export default router;