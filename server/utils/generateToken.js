import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/jwt.config';


// Generating Token, also taking roles as payload.
// for next middleware i.e. authorizeRoles.
export const generateToken = (userId, role) => {
    const token = jwt.sign(
        {userId : userId, role: role},
        SECRET_KEY, 
        {expiresIn: '7d'},
    );
    return token;
}