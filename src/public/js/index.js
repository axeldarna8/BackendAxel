const socket = io();

const productsContainer = document.getElementById("productslist");
const createProductForm = document.getElementById("create-product-form");
const deleteProductForm = document.getElementById("delete-product-form");
const idFieldValue = document.getElementById("id-Field-value");
const botonEnviar = document.getElementById("boton-enviar");

let user;
let chatBox = document.getElementById("chatBox");

fetch ("/api/products/realtimeproducts")

socket.on('products', (productos) => {
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

//socket.emit('message' , 'Hola, me conecte pa');

createProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(createProductForm);

    const product = {};

    for (const field of formData.entries()) {
        product[field[0]] = field[1];
    }
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
        Swal.fire({
            title: 'Hay campos sin completar',
            icon: 'error'
        })
    } else {
        product.status = true;
        await fetch("/api/products", {
            body: JSON.stringify(product),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        Swal.fire({
            title: 'Se ha añadido el objeto',
            icon: 'success'
        })
    }
})

deleteProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = idFieldValue.value;

    await fetch("/api/products/" + id, {
        body: id,
        method: "DELETE"
    });
})

Swal.fire({
    title: "Ingrese usuario",
    input: "text",
    inputValidator: value => {
        return !value && 'Necesita un usuario'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user)
})

chatBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value });
            chatBox.value = '';
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs')

    let messages = ''
    data.forEach(message => {
        messages += `<b>${message.user}</b>: ${message.message} <br>`
    })

    log.innerHTML = messages
})

socket.on('newUser', user => {
    Swal.fire({
        text: `New user connected ${user}`,
        toast: 'true',
        position: 'top-right'
    })

})