import Gerente from '../models/Gerente.js';

const crearGerente = async (req, res) => {
    try {
        const { email, password, nombre, apellido } = req.body;
        if (!email || !password || !nombre || !apellido) {
            return res.status(400).json({ msg: "Los campos nombre, apellido, email y password son obligatorios" });
        }
        const existeGerente = await Gerente.findOne({ email });
        if (existeGerente) {
            return res.status(400).json({ msg: "El email ya se encuentra registrado para un gerente." });
        }
        
        // Se crea la instancia pasando los datos del body.
        // La contraseña se queda en TEXTO PLANO aquí.
        const nuevoGerente = new Gerente(req.body);
        
        // Al ejecutar .save(), el middleware pre('save') de tu modelo
        // se encargará de hashear la contraseña automáticamente ANTES de que se guarde.
        await nuevoGerente.save();
        
        res.status(201).json({ msg: "Gerente creado exitosamente." });
    } catch (error) {
        console.error("Error al crear gerente:", error);
        res.status(500).json({ msg: "Error en el servidor al crear el gerente." });
    }
};    

// Login de gerente
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }
    const gerente = await Gerente.findOne({ email });
    if (!gerente) {
        return res.status(404).json({ msg: "Usuario gerente no encontrado." });
    }
    if (!await gerente.matchPassword(password)) {
        return res.status(401).json({ msg: "Contraseña incorrecta." });
    }
    const token = crearTokenJWT(gerente._id, gerente.rol);
    const { _id, nombre, rol } = gerente;
    res.status(200).json({ token, _id, nombre, email: gerente.email, rol });
};