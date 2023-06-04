import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";
import TicketController from "./ticket.controller.js";

const cart = new CartManager();
const productManager = new ProductManager()
const ticketController = new TicketController();

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
        res.redirect('/api/products');
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

    createPurchaseDB = async (req, res) => {
            const cid  = req.params;
            const user = req.session.user;
            const cartfound = await cart.getCartDB(cid);
            const purchase = cartfound.map(async product => {
                const stock = (await productManager.getProductDB(product._id));
                if(stock >= product.qty){
                    await productManager.updateProductDB(product.id, {stock: stock - quantity});
                    return product;
                }
            });
            const ticket = await ticketController.createTicket(user, purchase);
            cart = cart.filter(product => purchase.includes(product));
            res.status(200).json({cart, ticket});
    }
}

export default CartController