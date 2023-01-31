import express, { Router } from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import productsRouter from './routers/products.router.js';
import cartRouter from './routers/cart.router.js';
import productos from './database/productos.json' assert { type: "json" };
import mongoose, { mongo } from 'mongoose';
import messagesRouter from './routers/messages.router.js'
import { productModel } from './Dao/models/product.model.js';
import productController from './Dao/controllers/product.controller.js';

const app = express();
const router = Router();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));


const httpServer = app.listen(8080, () => {
    console.log('escuchando el 8080 pa');
})

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');



let messages = [];

let productRouter = null;

socketServer.on('connection', socket => {
    console.log(`New client connected, id: ${socket.id}`);

    productController.socket = socket;

    productRouter = productsRouter({ router, controller: productController, socket })

    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);
    app.use('/api/messages', messagesRouter);
    app.use('/', (req, res) => res.send('home'));

    socket.emit('products', []);

    socket.on('message', data => {
        console.log(data);
        messages.push(data);
        socketServer.emit('messageLogs', messages)
    })

    socket.on('authenticated', user => {
        socket.broadcast.emit('newUser', user)
    })

})


mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://axeldarna8:Minecraft2011@cluster0.dg8edeg.mongodb.net/eccomerce?retryWrites=true&w=majority', error => {
    if (error) {
        console.error('Cannot connect to database', error);
        process.exit();
    }
});




