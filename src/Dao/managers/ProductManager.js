let id = 0;
import fs from 'fs';
import { productModel } from '../models/product.model.js';

class ProductManager {

    constructor(title, description, price, thumbnail, code, stock, status, category, path) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnail = [];
        this.id = id;
        this.path = './database/productos.json';
    }



    getAllProductsDB = async (search, { page, limit }) => {
        const products = await productModel.paginate(search, { page, limit, lean: true });
        return products
    }

    getProductDB = async (pid) => {
        const product = await productModel.findOne({ _id: pid }).lean();
        return product;
    }

    addProductDB = async (producto) => {
        if (!producto.title || !producto.description || !producto.code || !producto.price || !producto.stock || !producto.category) {
            throw new Error('error en informacion');
        }
        await productModel.create(producto);
    }

    deleteProductDB = async (id) => {
        await productModel.deleteOne({ _id: id });
    }

    updateProductDB = async (pid, data) => {
        const product = productModel.findOneAndUpdate({ _id: pid }, data, { new: true });
        if (!product) {
            throw new Error('Objeto no encontrado');
        }
        return product;
    }

    addProduct = (producto, allproducts) => {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '');
        }
        if (allproducts.find(product => product.code === producto.code)) {
            console.log('ya se encuentra el producto');
        }
        else {
            producto.id = allproducts.length + 1;
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