import { Router } from 'express'
import { getMembers, createMember, updateMember, deleteMember, getMember } from '../controllers/members.controller.js'

import { ensureToken, verifyToken } from '../middleware.js';

const router = Router()


router.get('/members', ensureToken, verifyToken, getMembers)
router.get('/members/:id', ensureToken, verifyToken, getMember)
router.post('/members', ensureToken, verifyToken, createMember)
router.put('/members/:id', ensureToken, verifyToken, updateMember)
router.delete('/members/:id', ensureToken, verifyToken, deleteMember)

export default router
