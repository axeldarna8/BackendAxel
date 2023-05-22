import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_SESSION_SECRET: process.env.MONGO_SESSION_SECRET,
    PRIVATE_KEY: process.env.PRIVATE_KEY
}