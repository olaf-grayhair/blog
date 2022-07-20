const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (roleUser) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next()
        }
        console.log(req.headers);
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const {role: userRoles} = jwt.verify(token, process.env.SECRET_KEY)
            console.log(userRoles, 'userRoles');

            let hasRole = false
            userRoles.forEach(el => {
                if (el.includes(roleUser)) {
                    hasRole = true
                }
            })

            
            if (!hasRole) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            console.log(hasRole, 'PROSHOL PUTb');
            next();
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}