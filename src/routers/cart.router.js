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
    const result = await cartsModel.find({_id: cid});
    res.json(result);
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
    
})



export default router;
