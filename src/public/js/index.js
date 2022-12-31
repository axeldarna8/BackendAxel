const socket = io();

const productsContainer = document.getElementById("productslist");

socket.on('products', (productos)=>{

    const allProducts = productos.map(product =>
        `
        <tr>
            <td> ${product.title} </td> 
            <td> ${product.price} </td>
            <td> ${product.description} </td>
        </tr> <br>
        `
    ).join(" ");
    
    productsContainer.innerHTML = allProducts;
})

    socket.emit('message' , 'Hola, me conecte pa');