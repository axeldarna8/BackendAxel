import { Router } from "express";
import CartManager from "../Dao/managers/CartManager.js";
import CartController from "../Dao/controllers/cart.controller.js";
import { handlePolicies } from "../utils.js";

const router = Router();
const cart = new CartManager();
const cartController = new CartController();

router.get('/', cartController.getAllCartsDB)

router.get('/:cid', cartController.getCartDB)

router.post('/', cartController.createCartDB)

router.post('/:cid/products/:pid', handlePolicies("USER"), cartController.addProductinCartDB)

router.delete('/:cid',handlePolicies("ADMIN"), cartController.deleteCartDB)

router.delete('/:cid/products/:pid', handlePolicies("USER"), cartController.deleteProductinCartDB)

router.put('/:cid', cartController.updateCartDB)

router.put('/:cid/products/:pid', handlePolicies("USER"),  cartController.updateProductinCartDB)

router.post('/:cid/purchase', handlePolicies("USER"), cartController.createPurchaseDB);

export default router;
