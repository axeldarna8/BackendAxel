import { userModel, userDtoModel } from "../models/user.model.js";
import nodemailer from "nodemailer"
import config from "../../config/config.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_DELETE,
        pass: config.PASSWORD_DELETE
    }
})

async function sendDeletionEmail(email) {
    const mailOptions = {
        from: config.EMAIL_DELETE,
        to: email,
        subject: 'Eliminación de cuenta por inactividad',
        text: 'Debido a un largo periodo de inactividad tu cuenta fue eliminada'
    };
    await transporter.sendMail(mailOptions);
}


class UserManager {

    constructor() {
    }

    getAllUsersDB = async () => {
        const users = await userModel.find();
        const userDtos = users.map(user => new userDtoModel(user.toDto()));
        return userDtos
    }

    deleteUserDB = async () => {
        const rangoActividad = new Date();
        rangoActividad.setMinutes(rangoActividad.getMinutes() - 3000);

        const inactivos = await userModel.find({ last_connection: { $lt: rangoActividad } });
        for (const user of inactivos) {
            await sendDeletionEmail(user.email);
            await user.remove();
        }
    }

}

export default UserManager

