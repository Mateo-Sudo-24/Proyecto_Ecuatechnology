import jwt from "jsonwebtoken";
import Gerente from "../models/Gerente.js";

//Crea un token JWT firmado con el ID y el rol del usuario.
 
const crearTokenJWT = (id, rol) => {
    // El "payload" es la información que se almacena de forma segura dentro del token.
    const payload = { id, rol };
    
    // Se firma el payload con tu secreto y se le da un tiempo de expiración.
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
};

// Middleware principal para proteger rutas. Verifica el token JWT de la petición.

const verificarTokenJWT = async (req, res, next) => {
    let token;

    // 1. Verificar si el token viene en la cabecera 'Authorization' y tiene el formato 'Bearer'.
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extraer el token (ignorando la parte "Bearer ").
            token = req.headers.authorization.split(' ')[1];
            // 3. Verificar la firma del token y decodificar el payload (id y rol).
            // Si el token es inválido o ha expirado, jwt.verify lanzará un error.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // 4. Usar el 'id' del token para buscar al usuario en la base de datos.
            //    Esto confirma que el usuario todavía existe y obtiene sus datos actualizados.
            //    Se busca en todas las colecciones de usuarios posibles.
            let usuario;

            if (decoded.rol === "gerente") {
                usuario = await Gerente.findById(decoded.id).lean().select("-password -token");
            }

            // Si el token es válido pero el usuario asociado ya no existe en la BD.
            if (!usuario) {
                return res.status(401).json({ msg: "Token no válido, el usuario no existe." });
            }
      
            req.usuario = usuario;
            return next();

        } catch (error) {
            // Este bloque se ejecuta si jwt.verify falla (token expirado, malformado, etc.).
            return res.status(401).json({ msg: "Token no válido o expirado." });
        }
    }

    // Si no se encontró ningún token en la cabecera.
    if (!token) {
        return res.status(401).json({ msg: "Acceso denegado: no se proporcionó un token." });
    }
};

export { 
    crearTokenJWT,
    verificarTokenJWT 
};