import { Router } from 'express'
import { authenticated, protect } from '../controllers/auth.controller.js'
const router = Router()


router.post('/authenticated', authenticated)
router.get('/protect', ensureToken, protect) 
export default router

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}