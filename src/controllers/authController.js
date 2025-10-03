import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    const result = await authService.register(userData);

    if (!result.success) {
        return res.render('auth/register', { error: result.error });
    }

    res.cookie('auth', result.token);

    res.redirect('/');
});

authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    if (!result.success) {
        return res.render('auth/login', { error: result.error });
    }

    res.cookie('auth', result.token);

    res.redirect('/');
});


authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');

    // TODO: Invalidate token

    res.redirect('/');
});

export default authController;