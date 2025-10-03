import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';

export default function authMiddleware(req, res, next) {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        req.isAuthenticated = true;

        res.locals.isAuthenticated = true;
        res.locals.user = decodedToken;

        next();
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

export function isAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.redirect('/auth/login');
    }

    next();
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated) {
        return res.redirect('/');
    }

    next();
}
