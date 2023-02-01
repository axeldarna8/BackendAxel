import { Router } from "express";
import productos from '../database/productos.json' assert { type: "json" };
import ProductManager from "../Dao/managers/ProductManager.js";
import { productModel } from "../Dao/models/product.model.js";

const router = Router();


const manager = new ProductManager();

/*router.get('/users', async (req, res) => {
    try {
        const products = await productModel.find();
        console.log(products);
        res.send({
            result: "success",
            payload: products
        })
    } catch (error) {
        console.error("cannot get products", error);
        
    }
})*/

router.get('/', async (req, res) => {
    const products = await productModel.find().lean();
    res.render('home', { user: 'Axel', productos: products})
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
})

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const product = await productModel.findOne({ _id: pid}).lean();
    if (!product) {
        return res.send({ error: "Objeto no encontrado" });
    } else {
        res.render('home', { product: product, pid});
    }
})

/*router.post('/', async (req,res) =>{
    const item = req.body;
    await manager.addProduct(item,productos);
    const products = await productModel.find();
})*/

router.post('/', (req,res) =>{
    const item = req.body;
    if (!item.title || !item.description || !item.code || !item.price || !item.stock || !item.category){
        return res.status(400).send({status: "error", error: "Valores incompletos"});
    }
    manager.addProductDB(item);
})

router.put('/:pid', (req, res) =>{
    const pid = req.params.pid;
    const params = req.body;
    const objeto = productos.find(u => u.id.toString() === pid);
    if (!objeto) {
        return res.send({ error: "Objeto no encontrado" });
    } else {
        productos[pid] = params;
        res.send({status: "Success", message: "Item actualizado"});
    }
})

router.delete('/:pid', (req, res) =>{
    const pid = req.params.pid;
    const objeto = productos.find(u => u.id.toString() === pid);
    if (!objeto) {
        return res.send({ error: "Objeto no encontrado" });
    } else {
        manager.deleteProduct(pid);
        res.send({status: "Success", message: "Objeto eliminado"})
    }
})

export default router;
