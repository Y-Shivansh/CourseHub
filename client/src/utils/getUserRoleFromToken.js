import {jwtDecode} from 'jwt-decode'

export const getUserRoleFromToken = () => {
    const token = localStorage.getItem("coursehub_authToken");
    if (!token) return null;

    try{
        const decoded = jwtDecode(token);
        return decoded?.role || null;
    }catch(err){
        console.log(err);
        return null;
    }
}

