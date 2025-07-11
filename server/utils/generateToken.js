import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/jwt.config.js';


// Generating Token, also taking roles as payload.
// for next middleware i.e. authorizeRoles.
export const generateToken = (userId, role) => {
    try {
        const token = jwt.sign(
            { userId: userId, role: role },
            `${SECRET_KEY}`,
            { expiresIn: '7d' },
        );
        console.log(token);
        return token;
    }catch(error){
        return console.error("Token can't be created.", error.message);
    }
}