const UserManager = require('../../UserManager');

const run = async() =>{
    const manager = new UserManager();
    await manager.createUsers({
        nombre: 'axel',
        lastname: 'darnauchans',
        username: 'axeldarna8',
        password: '123456' 
    })

    await manager.createUsers({
        nombre: 'carlos',
        lastname: 'gutierrez',
        username: 'krlomarlo',
        password: '654321' 
    })

    console.log(await manager.getUsers());

    await manager.validateUser('krlomarlo', '654321');
}

run();


