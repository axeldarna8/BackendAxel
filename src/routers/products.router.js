import { query, Router } from "express";
import ProductController from "../Dao/controllers/product.controller.js";
import { handlePolicies } from "../utils.js";


const router = Router();

const productController = new ProductController();

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
})

router.get('/', productController.getAllProductsDB)

router.get('/:pid', productController.getProducDB)

router.post('/', handlePolicies("ADMIN"), productController.addProductDB)

router.put('/:pid', handlePolicies("ADMIN"), productController.updateProductDB)

router.delete('/:pid', handlePolicies("ADMIN") , productController.deleteProductDB)

export default router;
