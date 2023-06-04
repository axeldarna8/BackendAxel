import ProductManager from "../managers/ProductManager.js";

const manager = new ProductManager();

class ProductController {

    getProducDB = async (req, res) => {
        const pid = req.params.pid;
        const product = await manager.getProductDB(pid);
        if (!product) {
            return res.send({ error: "Objeto no encontrado" });
        } else {
            res.render('home', { product: product, pid: pid });
        }
    }

    getAllProductsDB = async (req, res) => {
        const page = req.query?.page || 1;
        const limit = req.query?.limit || 10;
        const filter = req.query?.query || req.body?.query || "";

        const search = {};
        if (filter) {
            search["$or"] = [
                { title: { $regex: filter } },
                { description: { $regex: filter } }
            ]
        }
        const result = await manager.getAllProductsDB(search, { page, limit });
        const user = req.session.user
        const cid = user.cart[0].carts;

        result.prevLink = result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);
        res.render('home', { user, result, cid })
    }

    addProductDB = async (req, res) => {
        const item = req.body;
        if (!item.title || !item.description || !item.code || !item.price || !item.stock || !item.category) {
            return res.status(400).send({ status: "error", error: "Valores incompletos" });
        }
        manager.addProductDB(item);
        res.redirect('/api/products');
    }

    updateProductDB = async (req, res) => {
        const pid = req.params.pid;
        const data = req.body;
        try {
            const updated = await manager.updateProductDB(pid, data);
            res.json({
                status: 'Success',
                message: 'Producto actualizado',
                data: data
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    }

    deleteProductDB = async (req, res) => {
        const pid = req.params.pid;
        try {
            const deleted = await manager.deleteProductDB(pid);
            res.json({
                status: 'Success',
                message: 'Producto eliminado',
                data: deleted
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
        
    }
}

export default ProductController