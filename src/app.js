import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';

import productsRouter from './routers/products.router.js';
import cartRouter from './routers/cart.router.js';
import messagesRouter from './routers/messages.router.js'
import sessionsRouter from './routers/sessions.router.js'
import userRouter from './routers/user.router.js'
import jwtRouter from './routers/jwt.router.js'

import ProductManager from './Dao/managers/ProductManager.js';
import { productModel } from './Dao/models/product.model.js';

import mongoose, { mongo } from 'mongoose';
import _ from 'mongoose-paginate-v2';
import cookieParser from 'cookie-parser';
import session from "express-session";
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';

import passport from 'passport';
import initializePassport from './config/passport.config.js';
import config from './config/config.js';

const app = express();
const httpServer = app.listen(config.PORT, () => {
    console.log('escuchando el 8080 pa');
})
const socketServer = new Server(httpServer);

const manager = new ProductManager();

const fileStorage = FileStore(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 1000
    }),
    secret: config.MONGO_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session())


function auth(req, res, next) {
    let authNotDone = false;
    if (req.session?.user) {
        return next();
    } else {
        authNotDone = true
        const error = 'No se ha logeado en su cuenta'
        return res.status(401).render('session/login', { authNotDone, error })
    }
}

app.use('/api/products', auth, productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', userRouter);
app.use('/api/jwt', jwtRouter);
app.use('/', (req, res) => res.send('home'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGO_URL, error => {
    if (error) {
        console.error('Cannot connect to database', error);
        process.exit();
    }
});


let messages = [];

socketServer.on('connection', async (socket) => {
    console.log(`New client connected, id: ${socket.id}`);


    socket.on('message', data => {
        messages.push(data);
        socketServer.emit('messageLogs', messages)
    })

    socket.on('authenticated', user => {
        socket.broadcast.emit('newUser', user)
    })

    const dataEmited = await productModel.find().lean();
    socketServer.sockets.emit('products', dataEmited);

    socket.on('addProduct', async (data) => {
        await manager.addProductDB(data);
        const items = await productModel.find()
        socket.emit('products', items)
    })

    socket.on('deleteProduct', async (data) => {
        await manager.deleteProductDB(data);
        const items = await productModel.find()
        socket.emit('products', items)
    })
})
