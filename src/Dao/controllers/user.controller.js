import UserManager from "../managers/UserManager.js";

const userManager = new UserManager();

class UserController {

    getAllUsersDB = async (req, res) => {
        const result = await userManager.getAllUsersDB();
        res.json(result);
    }

    deleteUserDB = async (req, res) => {
        const result = await userManager.deleteUserDB();
        res.json({ message: 'Usuarios inactivos eliminados y correos enviados' });
    }
    
}

export default UserController