import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import productsRouter from './routers/products.router.js';
import cartRouter from './routers/cart.router.js';
import productos from './database/productos.json' assert { type: "json" };

const app = express();
const httpServer = app.listen(8080, () => {
    console.log('escuchando el 8080 pa');
})
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', (req, res) => res.send('home'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

let messages = [];

socketServer.on('connection' , socket =>{
    console.log(`New client connected, id: ${socket.id}`);

    socket.on('message', data =>{
        //console.log('From Client: ' , data);  
        console.log(data);  
        messages.push(data);
        socketServer.emit('messageLogs' , messages)
    })

    socket.on('authenticated', user =>{
        socket.broadcast.emit('newUser', user)
    })

    socket.emit('products', productos);
})


