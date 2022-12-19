let id = 0;
import fs from 'fs';
import productos from '../database/productos.json' assert { type: "json" };
//const fs = require('fs');
//const { title } = require('process');

class ProductManager {

    constructor(title, description, price, thumbnail, code, stock,status, category, path) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
        this.id = id;       
        this.path = './database/productos.json';
    }

    addProduct = (producto, allproducts) => {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '');
        }
        if (allproducts.find(product => product.code === producto.code)) {
            console.log('ya se encuentra el producto');
        }
        else {
            producto.id = allproducts.length;
            allproducts.push(producto);
            const jsonStr = JSON.stringify(allproducts);
            fs.writeFileSync(this.path, jsonStr);
        }
    }

    getProducts = () => {
        fs.readFile(this.path, 'utf-8', (error, contenido) => {
            if (error) {
                return console.log('errorsinho 2')
            }
            else {
                const json = JSON.parse(contenido);
                console.log('contenido', json);
            }
        })
    }

    getProductById = (id) => {
        if (fs.existsSync(this.path)) {
            fs.promises.readFile(this.path, 'utf-8')
                .then(contenido => {
                    const json = JSON.parse(contenido);
                    if (json.find(e => e.id == id)) {
                        console.log('se encontro objeto con este ID');
                        console.log(json[id - 1]);
                    } else {
                        console.log('no existe ese objeto bro');
                    }
                })
        } else {
            console.log('Not found');
        }


    }
    updateProduct = (id, update, campo) => {
        if (fs.existsSync(this.path)) {
            fs.promises.readFile(this.path, 'utf-8')
                .then(contenido => {
                    const json = JSON.parse(contenido);
                    switch (campo) {
                        case 'title':
                            json[id - 1].title = update;
                            break;
                        case 'description':
                            json[id - 1].description = update;
                            break;
                        case 'price':
                            json[id - 1].price = update;
                            break;
                        case 'thumbnail':
                            json[id - 1].thumbnail = update;
                            break;
                        case 'code':
                            json[id - 1].code = update;
                            break;
                        case 'stock':
                            json[id - 1].stock = update;
                            break;
                        default:
                            break;
                    }
                    const jsonStr = JSON.stringify(json);
                    fs.writeFileSync(this.path, jsonStr);
                })
                .catch(e => console.error('error', e))
        } else {
            console.log('Not found');
        }
    }

    deleteProduct = (id) => {
        if (fs.existsSync(this.path)) {
            fs.promises.readFile(this.path, 'utf-8')
                .then(contenido => {
                    const json = JSON.parse(contenido);
                    if (json.find(e => e.id == id)) {
                        json.splice(id - 1, 1);
                        const jsonStr = JSON.stringify(json);
                        fs.writeFileSync(this.path, jsonStr);
                        console.log(json[id - 1].title);
                    } else {
                        console.log('no existe ese objeto bro');
                    }
                })
        } else {
            console.log('Not found');
        }

    }

}

export default ProductManager;

/*let prueba = new ProductManager('prueba', 'esto es una prueba', '200', 'no image', 'abc123', '25');
let prueba2 = new ProductManager('titulo', 'ekisde', '100', 'fotico', '7', '13');
let prueba3 = new ProductManager('cumbia', 'xd', '170', 'picture', 'asdasd', 'czxczxcasd');
prueba.getProducts();
prueba.addProduct(prueba);
prueba.addProduct(prueba2);
prueba.addProduct(prueba3);/*
prueba.getProductById(1);
prueba.updateProduct(1, 'xd', 'title');
prueba.getProductById(1);
prueba.getProducts();

prueba.updateProduct(1,"titulo2" )
prueba.getProducts();
prueba.addProduct(prueba);
let prueba2 = new ProductManager('titulo','ekisde', '100', 'fotico', '7', '13');
prueba.addProduct(prueba2);
prueba.getProducts();
prueba.getProductById(3);
prueba.getProductById(1);
console.log(prueba2);*/