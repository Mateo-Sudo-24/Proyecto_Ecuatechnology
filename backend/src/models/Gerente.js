import { Schema, model } from 'mongoose'
import bcrypt from "bcryptjs"

const usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    apellido:{
        type:String,
        required:true,
        trim:true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    celular:{
        type:String,
        trim:true,
        default:null
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true   // Usuario activo/inactivo
    },
    token:{
        type:String,
        default:null   // Para recuperación de cuenta
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    rol:{
        type:String,
        enum:["gerente","recepcion","tecnico","ventas","cliente"],
        default:"cliente"
    },
    permisos:[{
        type:String,
        enum:[
            "gestionarUsuarios",
            "verReportes",
            "aprobarProcesos",
            "registrarEquipos",
            "diagnosticar",
            "generarProformas",
            "consultarEstado"
        ]
    }],
    twoFactorEnabled:{
        type:Boolean,
        default:false
    },
    twoFactorCode:{
        type:String,
        default:null
    }
},{
    timestamps:true
})

// Método para cifrar la contraseña
usuarioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar contraseña
usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para generar token
usuarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default model('Usuario', usuarioSchema)
