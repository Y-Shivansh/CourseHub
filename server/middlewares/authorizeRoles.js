// authorizeRoles(...roles) tabhi kaam aata hai:
// Jab hame ek se zyada roles ko allow karna ho ek route par.

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // user role comes from verifyUserToken, which decoded JWT
        const userRole = req.user.role;
        
        if(!roles.includes(userRole)){
            return res.status(403).json({
                message: `Access Denied! This route is only for ${roles}`
            })
        }
        next(); // role matched, continue to controller.
    }
}