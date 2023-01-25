const socket = io();

const productsContainer = document.getElementById("productslist");
const createProductForm = document.getElementById("create-product-form");
const deleteProductForm = document.getElementById("delete-product-form");
const idFieldValue = document.getElementById("id-Field-value");
const botonEnviar = document.getElementById("boton-enviar");

let user;
let chatBox = document.getElementById("chatBox");


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