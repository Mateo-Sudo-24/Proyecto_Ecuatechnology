// Middleware para verificar si el usuario tiene el rol de 'gerente'
export const existeGerente = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'gerente') {
        return next();
    }
    return res.status(403).json({ msg: "Acceso denegado. Se requiere rol de Gerente." });
};

