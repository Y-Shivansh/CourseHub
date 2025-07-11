import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config/jwt.config'; 

const verifyUserToken = (req, res, next) => {
    try {
        const token = req.header.authorization?.split[1];
        if(!token) res.status(403).json({message: "Access Denied, no token provided"});
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if(err){
                return res.status(403).json({message: "Invalid or Forbidded Token", err});
            }
            req.user = decoded;
            next();
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Invalid or expired token." });
    } 
}
export default verifyUserToken;