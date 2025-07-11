import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/jwt.config';

export const generateToken = (userId) => {
    const token = jwt.sign(userId, SECRET_KEY);
    return token;
}