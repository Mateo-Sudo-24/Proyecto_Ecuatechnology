import { verificarTokenJWT } from './JWT.js';
import { existeGerente } from './AuthMiddleware.js';
import Gerente from '../models/Gerente.js';

// Este es un middleware "combinado"
export const protegerRutaCrearGerente = async (req, res, next) => {
    try {
        // Contamos cuántos documentos de gerente hay en la base de datos.
        const gerenteCount = await Gerente.countDocuments();

        if (gerenteCount === 0) {
            // SI NO HAY GERENTES, la petición puede pasar. No se requiere token.
            // Esto permite crear el primer "super gerente".
            console.log("No hay gerentes. Permitiendo la creación del primer gerente.");
            return next();
        } else {
            // SI YA HAY GERENTES, la ruta se vuelve privada.
            // Ejecutamos la cadena de middlewares de seguridad normal.
            console.log("Ya existen gerentes. La ruta requiere autenticación de gerente.");
            return verificarTokenJWT(req, res, () => existeGerente(req, res, next));
        }
    } catch (error) {
        return res.status(500).json({ msg: "Error del servidor al verificar gerentes." });
    }
};