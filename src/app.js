const express = require('express');
const fs = require('fs');
const app = express();
const productos = require('../productos.json');
app.use(express.urlencoded({ extended: true }))

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const productsFiltered = productos.filter(u => u.id <= limit)
        res.send(productsFiltered)
    } else {
        res.send({ productos });
    }

})

app.get('/products/:pid', (req, res) => {
    const pid = req.params.pid;
    const objeto = productos.find(u => u.id === pid);
    if (!objeto) {
        return res.send({ error: "Objeto no encontrado" });
    } else {
        res.send({ objeto });
    }
})


app.listen(8080, () => {
    console.log('escuchando el 8080 pa');
})

