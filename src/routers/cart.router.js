import { Router } from "express";
import fs from 'fs';
import carts from '../database/carts.json' assert { type: "json" };
import productos from '../database/productos.json' assert { type: "json" };
import CartManager from "../Dao/managers/CartManager.js";
import { cartsModel } from "../Dao/models/carts.model.js";
import { resourceUsage } from "process";

const router = Router();
const cart = new CartManager();
const filename = './database/carts.json';

router.get('/', async (req,res) =>{
    const result = await cartsModel.find();
    res.json(result);
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const result = await cartsModel.findOne({_id: cid}).lean();
    if (!result) {
        return res.send({ error: "Carrito no encontrado" });
    } else {
        res.render('cartid', { cart: result , cid: cid , products: result.products});
    }
})


router.post('/', async (req, res) => {
    const result = await cart.createCartDB(cart);
    res.send(result);
})

router.post('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await cart.addProductinCartDB(cid,pid);
    res.send(result)
})

router.delete('/:cid', async (req, res) =>{
    const cid = req.params.cid;
    const result = await cart.deleteCartDB(cid);
    res.send(result);
})

router.delete('/:cid/products/:pid', async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await cart.deleteProductinCartDB(cid, pid);
    res.send(result);
})

router.put('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const newProducts = req.body
    const result = await cart.updateCartDB(cid, newProducts);
    res.send(result);
})

router.put('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const newQty = req.body
    const result = await cart.updateProductinCartDB(cid, pid, newQty);
    res.send(result);
})

export default router;
