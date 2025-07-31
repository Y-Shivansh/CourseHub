// authorizeRoles(...roles) needed only when: 
// we need to allow multiple roles on one route.

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // decoded jwt token
        
        if(!roles.includes(userRole)){
            return res.status(403).json({
                message: `Access Denied! This route is only for ${roles}`
            })
        }
        next(); // role matched, continue to controller.
    }
}