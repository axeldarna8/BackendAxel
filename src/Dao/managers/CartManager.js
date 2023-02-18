import fs from 'fs';
import productos from '../../database/productos.json' assert { type: "json" };
import ProductManager from "../managers/ProductManager.js";
import { cartsModel } from '../models/carts.model.js';
import { productModel } from '../models/product.model.js';

let carritomain = [];

const filename = './database/carts.json';

class CartManager {

    constructor(products) {
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

    addproductCarrito = (cid, pid) => {
        let producto = {};
        const carritofound = carts.find(u => u.cid.toString() === cid);
        const productfound = productos.find(producto => producto.id.toString() === pid);
        if (carritofound) {
            if (productfound) {
                console.log(carritofound.products);
                const itemencarritofound = carritofound.products.find(producto => producto.id.toString() === pid);
                if (itemencarritofound) {
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
    }

    createCartDB = async (carrito) => {
        await cartsModel.create(carrito)
    }

    deleteCartDB = async (cid) => {
        const cartfound = await cartsModel.findOne({_id: cid});
        cartfound.products = [];
        await cartsModel.updateOne({_id: cid} , cartfound);
    }

    addProductinCartDB = async (cid,pid) => {
        const cartfound = await cartsModel.findOne({_id: cid});
        cartfound.products.push({product: pid});
        await cartsModel.updateOne({_id: cid} , cartfound);
    }

    deleteProductinCartDB = async (cid, pid) => {
        const cartfound = await cartsModel.findOne({_id: cid});
        const arrProducts = cartfound.products
        for (var i = 0; i < arrProducts.length; i++) {
            if (arrProducts[i].product._id == pid) {
                arrProducts.splice(i, 1);
            }
        }
        await cartsModel.updateOne({_id: cid} , cartfound)
    }

}

export default CartManager;