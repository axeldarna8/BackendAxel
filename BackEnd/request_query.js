const express = require('express');

const app = express();
app.use(express.urlencoded({extended: true}))

const users = [{nombre: 'carlos', gender:'M'},
            {nombre: 'brenda', gender: 'F'}]

app.get('/', (req, res) =>{
    const gender = req.query.gender;

    if(gender && (gender.toUpperCase() == 'M' || gender.toUpperCase() == 'F')){
        const userFiltered = users.filter(u => u.gender == gender.toUpperCase())
        res.send(userFiltered)
    } else {
        res.send({users});
    }
})

app.listen(8080, ()=>{
    console.log('escuchando el 8080 pa');
})