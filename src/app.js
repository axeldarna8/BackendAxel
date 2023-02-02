import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import productsRouter from './routers/products.router.js';
import ProductManager from './Dao/managers/ProductManager.js';
import cartRouter from './routers/cart.router.js';
import mongoose, { mongo } from 'mongoose';
import messagesRouter from './routers/messages.router.js'
import { productModel } from './Dao/models/product.model.js';
import _ from 'mongoose-paginate-v2';

const app = express();
const httpServer = app.listen(8080, () => {
    console.log('escuchando el 8080 pa');
})
const socketServer = new Server(httpServer);

const manager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/messages', messagesRouter);
app.use('/', (req, res) => res.send('home'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://axeldarna8:Minecraft2011@cluster0.dg8edeg.mongodb.net/eccomerce?retryWrites=true&w=majority', error => {
    if (error) {
        console.error('Cannot connect to database', error);
        process.exit();
    }
});


let messages = [];

socketServer.on('connection', async (socket) => {
    console.log(`New client connected, id: ${socket.id}`);
    
    
    socket.on('message', data => {
        //console.log('From Client: ' , data);  
        console.log(data);
        messages.push(data);
        socketServer.emit('messageLogs', messages)
    })

    socket.on('authenticated', user => {
        socket.broadcast.emit('newUser', user)
    })
    
    const dataEmited = await productModel.paginate({},{limit:10, lean:true});
    socketServer.sockets.emit('products' , dataEmited.docs);

    socket.on('addProduct', async (data) =>{
        await manager.addProductDB(data);
        const items = await productModel.paginate({},{limit:10, lean:true})
        socket.emit('products', items.docs)
    })

    socket.on('deleteProduct', async (data) =>{
        await manager.deleteProductDB(data);
        const items = await productModel.paginate({},{limit:10, lean:true})
        socket.emit('products', items.docs)
    })

    
})
