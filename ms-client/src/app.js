import dotenv from 'dotenv';
import { initServer } from './Client/Infraestructure/index.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

initServer();