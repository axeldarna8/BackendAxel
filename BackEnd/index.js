const express = require('express');

const app = express();

const html = '<h1 style="color:red"> Hola amigos del mundo </h1>';

const users= [
    {id: "1", name: 'axel',lastname: 'darnauchans'},
    {id: "2", name: 'carlos', lastname: 'gutierrez'},]

/*app.get('/saludo/:nombre', (req,res) =>{

    console.log(req.params);
    const saludo = `Saludos a ${req.params.nombre}`;
    res.send(saludo);
})*/

app.get('/', (req,res) =>{
    res.send(users);
})

app.get('/:id', (req,res) =>{
    const id = req.params.id;
    const user = users.find(u => u.id === id);
    if (!user){
        return res.send({error: "user not found"});
    } else {
        res.send({user});
    }
    
})

app.get('/bienvenida', (request, response) =>{
    response.send(html);
})

app.get('/usuario', (request, response) =>{
    response.send(objeto);
})

app.listen(8080, ()=>{
    console.log('escuchando el 8080 pa');
})