import { userModel } from "../models/user.model.js";

class UserManager {

    constructor () {

    }

    getAllUsersDB =  async () => {
        const users = await userModel.find().lean();
        return users
    }
}

export default UserManager