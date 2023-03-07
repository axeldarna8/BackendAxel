import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

/*
 * hashSync : toma el password y salt para "hashear"
 * genSaltSync : General un salt (string aleatorio)
 * El password no se puede volver a obtener por ningun metodo. Irreversible
*/


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password , user.password);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;