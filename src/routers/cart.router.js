import { Router } from "express";
import fs from 'fs';
import carts from '../database/carts.json' assert { type: "json" };
import productos from '../database/productos.json' assert { type: "json" };
import CartManager from "../managers/CartManager.js";

const router = Router();
const cart = new CartManager('../database/carts.json');
const filename = './database/carts.json';

router.post('/', (req, res) => {
    cart.addCart(cart, carts);
})

router.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    let producto = {};
    const carritofound = carts.find(u => u.cid.toString() === cid);
    const productfound = productos.find(producto => producto.id.toString() === pid);
    if (carritofound) {
        if (productfound) {
            console.log(carritofound.products);
            const itemencarritofound = carritofound.products.find(producto => producto.id.toString() === pid);
            if (itemencarritofound){
                itemencarritofound.qty++;
                res.send({ error: "Se actualizo cantidad producto" });
            } else {
                producto.id = pid;
                producto.qty = 1;
                carritofound.products.push(producto);
                res.send({ error: "Se agrego producto" });
            }
            const jsonStr = JSON.stringify(carts);
            fs.writeFileSync(filename, jsonStr);
        } else {
            return res.send({ error: "No se encontro objeto en la base de datos" });
        }
    } else {
        return res.send({ error: "No se encontro carrito" });
    }
})

router.get('/:cid', (req, res) => {
    const cid = req.params.cid;
    const carritofound = carts.find(u => u.cid.toString() === cid);
    if (!carritofound) {
        return res.send({ error: "Lista de productos vacia" });
    } else {
        res.send(carritofound.products);
    }
})


export default router;
