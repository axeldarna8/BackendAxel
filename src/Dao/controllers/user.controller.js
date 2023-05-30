import UserManager from "../managers/UserManager.js";

const userManager = new UserManager();

class UserController {

    getAllUsersDB = async (req, res) => {
        const result = await userManager.getAllUsersDB();
        res.json(result);
    }
}

export default UserController