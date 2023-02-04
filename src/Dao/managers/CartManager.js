import fs from 'fs';
import productos from '../../database/productos.json' assert { type: "json" };
import ProductManager from "../managers/ProductManager.js";
import { cartsModel } from '../models/carts.model.js';

let carritomain = [];

const filename = './database/carts.json';

class CartManager {

    constructor(cid, products) {
        this.cid = cid;
        this.products = [];
    }

    addCart = (cart, allcarts) => {
        if (!fs.existsSync(filename)) {
            fs.writeFileSync(filename, '[]');
        }
        if (allcarts.find(carrito => carrito.cid === cart.cid)) {
            console.log('Carrito ya existente, cuidado duplicado');
        } else {
            cart.cid = allcarts.length + 1;
            allcarts.push(cart);
            const jsonStr = JSON.stringify(allcarts);
            fs.writeFileSync(filename, jsonStr);
        }
    }

    createCartDB = async (carrito) => {
        await cartsModel.create(carrito)
    }

    addproductCarrito = (cid, allcarts, allproducts, pid) =>{
        const cartfound = allcarts.find(carrito => carrito.cid === cid);
        const productfound = allproducts.find(producto => producto.id === pid);
        if (!cartfound){
            return res.send({ error: "No se encontro el carrito" });
        }
    }

    deleteCartDB = async (id) =>{
        await productModel.deleteOne({_id: id});
    }

}

export default CartManager;