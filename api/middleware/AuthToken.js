const jwt = require('jsonwebtoken');
const secret_key = 'g3$T1onVid30+B3M4$7eR';

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            jwt.verify(token, secret_key, function (error, decoded) {
                if (error) {
                    return res.status(403).send({ message: 'No tiene permisos suficientes para estar aqui', error });
                } else {
                    // roles param can be a single role string (e.g. Role.User or 'User') 
                    // or an array of roles (e.g. ['administrador', 'estudiante'])
                    if (typeof roles === 'string') {
                        roles = [roles];
                    }

                    if (roles.length && !roles.includes(decoded.role)) {
                        // user's role is not authorized
                        return res.status(403).send({ message: 'No tiene permisos suficientes para estar aqui', error: 'Unauthorized' });
                    }

                    // authentication and authorization successful
                    next();

                }
            });
        } else res.status(403).send({ message: 'No tiene permisos suficientes para estar aqui' });
    }
}

module.exports = authorize;
