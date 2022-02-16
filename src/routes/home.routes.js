import { Router } from 'express'
import { home } from '../controllers/home.controller'

const router = Router()

router.get('/', home)

export default router
