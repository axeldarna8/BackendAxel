import { Router } from "express";
import productos from '../database/productos.json' assert { type: "json" };
import ProductManager from "../Dao/managers/ProductManager.js";

const router = Router();

const manager = new ProductManager('../database/productos.json');

const productRouter = ({router,controller,socket}) =>{
    router.post('/', controller.addProductController);
    
    router.get('/realtimeproducts', controller.getProductsController);

    router.get('/', async (req, res) => {
        const limit = req.query.limit;
        if (limit) {
            const productsFiltered = productos.filter(u => u.id <= limit)
            res.render('home', { user: 'Axel', productsFiltered, limit})
        } else {
            res.render('home', { user: 'Axel', productos: productos});
        }
    })
    
    router.get('/:pid', async (req, res) => {
        const pid = req.params.pid;
        const objeto = await productos.find(u => u.id.toString() === pid);
        if (!objeto) {
            return res.send({ error: "Objeto no encontrado" });
        } else {
            res.render('home', { user: 'Axel', objeto, pid});
        }
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

    return router;
}

export default productRouter;
