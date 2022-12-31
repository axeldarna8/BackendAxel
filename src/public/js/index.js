//const { create } = require("express-handlebars");

const socket = io();

const productsContainer = document.getElementById("productslist");
const createProductForm = document.getElementById("create-product-form");
const deleteProductForm = document.getElementById("delete-product-form");

socket.on('products', (productos)=>{

    const allProducts = productos.map(product =>
        `
        <tr>
            <td> ${product.title} </td> 
            <td> ${product.price} </td>
            <td> ${product.description} </td>
            <td> ${product.stock} </td>
            <td> ${product.code} </td>
        </tr> <br>
        `
    ).join(" ");
    
    productsContainer.innerHTML = allProducts;
})

socket.emit('message' , 'Hola, me conecte pa');

createProductForm.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const formData = new FormData(createProductForm);
    
    const product = {};

    for(const field of formData.entries()){
        product[field[0]] = field[1];
    }
    await fetch("/api/products", {
        body: JSON.stringify(product),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
})

deleteProductForm.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const formData = new FormData(deleteProductForm);
    
    const product = {};

    for(const field of formData.entries()){
        product[field[0]] = field[1];
    }
    await fetch("/api/products", {
        body: JSON.stringify(product),
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
})