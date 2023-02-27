import { Router } from 'express'
import { getJuntas, createJunta, updateJunta, deleteJunta, getJunta, joinJunta } from '../controllers/juntas.controller.js'
import { ensureToken, verifyToken } from '../middleware.js';
const router = Router()


router.get('/juntas', ensureToken, verifyToken, getJuntas)
router.get('/juntas/:id', ensureToken, verifyToken, getJunta)
router.post('/juntas', ensureToken, verifyToken, createJunta)
router.post('/juntas/:id/members', ensureToken, verifyToken, joinJunta)
router.patch('/juntas/:id', ensureToken, verifyToken, updateJunta)
router.delete('/juntas/:id', ensureToken, verifyToken, deleteJunta)

export default router
