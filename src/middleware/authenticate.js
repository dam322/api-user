import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // No se proporcionó el token

    // Obtén la clave secreta desde una variable de entorno
    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Token inválido
        req.user = user; // Añadir el usuario decodificado al objeto de solicitud
        next(); // Continuar con el siguiente middleware
    });
};

export default authenticateToken;