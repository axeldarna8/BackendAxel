import ProductManager from "../managers/ProductManager.js";

const manager = new ProductManager();

const productController = {};

productController.socket = '';

productController.addProductController = async (req, res) => {
    try {
        const item = req.body;
        await manager.addProductDB(item,productController.socket);
        res.status(200).send({ status: "Success", message: "Objeto enviado" })
    } catch (error) {
        res.status(400).send({status: "Error", message: 'Error en enviar datos'})
    }
}

productController.getProductsController = async (req, res) =>{
    try {
        const products = await manager.getProductsDB(productController.socket);
        productController.socket.emit('products', products);
        console.log(products);
        res.render('realTimeProducts');
    } catch (error) {
        console.log(error);
        res.status(400).send({status: "Error", message: "No se pudo renderizar productos"})
    }
}

export default productController;