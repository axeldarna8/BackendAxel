import { query, Router } from "express";
import productos from '../database/productos.json' assert { type: "json" };
import ProductManager from "../Dao/managers/ProductManager.js";
import { productModel } from "../Dao/models/product.model.js";

const router = Router();


const manager = new ProductManager();

/*router.get('/', async (req, res) => {
    const products = await productModel.find().lean();
    res.render('home', { user: 'Axel', productos: products})
})*/

router.get('/', async (req,res) =>{

    const page = req.query?.page || 1;
    const limit = req.query?.limit || 10;
    const filter = req.query?.query || req.body?.query || "";

    const search = {};
    if (filter){
        search["$or"] = [
            {title: {$regex: filter}},
            {description: {$regex: filter}}
        ]
    }
    const result = await productModel.paginate(search,{page, limit, lean:true});
    console.log(result);

    result.prevLink = result.hasPrevPage ? `/api/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `/api/products?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)

    res.render('home', result)
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
        res.render('home', { product:product , pid: pid});
    }
})

router.post('/', async (req,res) =>{
    const item = req.body;
    if (!item.title || !item.description || !item.code || !item.price || !item.stock || !item.category){
        return res.status(400).send({status: "error", error: "Valores incompletos"});
    }
    manager.addProductDB(item);
    res.render('home', item);
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
