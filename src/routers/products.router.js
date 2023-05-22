import { query, Router } from "express";
import ProductController from "../Dao/controllers/product.controller.js";


const router = Router();

const productController = new ProductController();

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
})

router.get('/', productController.getAllProductsDB)

router.get('/:pid', productController.getProducDB)

router.post('/', productController.addProductDB)

router.put('/:pid', productController.updateProductDB)

router.delete('/:pid', productController.deleteProductDB)

export default router;
