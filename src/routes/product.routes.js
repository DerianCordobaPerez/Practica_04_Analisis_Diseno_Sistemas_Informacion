import { Router } from 'express'
import { index, create, store, show, edit, update, destroy } from '../controllers/product.controller' 
import { uploadImages } from '../middlewares/multer'

const router = Router()

router.get('/products', index)
router.get('/products/create', create)
router.post('/products/create', uploadImages('products'), store)
router.get('/products/:slug/show', show)
router.get('/products/:slug/edit', edit)
router.put('/products/:slug/edit', uploadImages('products'), update)
router.delete('/products/:slug/destroy', destroy)

export default router