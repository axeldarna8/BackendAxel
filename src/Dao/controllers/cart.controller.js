import CartManager from "../managers/CartManager.js";

const cart = new CartManager();

class CartController {

    getCartDB = async (req, res) => {
        const cid = req.params.cid;
        const result = await cart.getCartDB(cid);
        if (!result) {
            return res.send({ error: "Carrito no encontrado" });
        } else {
            res.render('cartid', { cart: result, cid: cid, products: result.products });
        }
    }

    getAllCartsDB = async (req, res) => {
        const result = await cart.getAllCartsDB();
        res.json(result);
    }

    createCartDB = async (req, res) => {
        const result = await cart.createCartDB();
        res.send(result)
    }

    addProductinCartDB = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const result = await cart.addProductinCartDB(cid, pid);
        res.send(result)
    }

    deleteCartDB = async (req, res) => {
        const cid = req.params.cid;
        const result = await cart.deleteCartDB(cid);
        res.send(result);
    }

    deleteProductinCartDB = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const result = await cart.deleteProductinCartDB(cid, pid);
        res.send(result);
    }

    updateCartDB = async (req, res) => {
        const cid = req.params.cid;
        const newProducts = req.body
        const result = await cart.updateCartDB(cid, newProducts);
        res.send(result);
    }

    updateProductinCartDB = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const newQty = req.body
        const result = await cart.updateProductinCartDB(cid, pid, newQty);
        res.send(result);
    }
}

export default CartController