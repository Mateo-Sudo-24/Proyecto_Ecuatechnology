import sendMail from "../helpers/sendMail.js";

const sendMailToRegister = (userMail, token) => {
  return sendMail(
    userMail,
    "Bienvenido a Ecuatechnology - Confirma tu cuenta",
    `
      <h2 style="color:#1e293b;">¡Bienvenido a Ecuatechnology!</h2>
      <p style="font-size:15px;color:#334155;">
        Gracias por registrarte. Haz clic en el botón de abajo para confirmar tu cuenta:
      </p>
      <p style="text-align:center;margin:30px 0;">
        <a href="${process.env.URL_FRONTEND}/confirm/${token}" 
           style="background:#1e40af;color:#ffffff;text-decoration:none;
           padding:12px 24px;border-radius:6px;font-size:16px;">
          Confirmar cuenta
        </a>
      </p>
      <p style="font-size:13px;color:#64748b;">
        Si no solicitaste esta cuenta, puedes ignorar este correo.
      </p>
    `
  )
}

const sendMailOTP = (userMail, otp) => {
  return sendMail(
    userMail,
    "Tu código de verificación - Ecuatechnology",
    `
      <h2 style="color:#1e293b;">Validación en 2 Pasos</h2>
      <p style="font-size:15px;color:#334155;">
        Hola, tu código de verificación es:
      </p>
      <p style="text-align:center;margin:30px 0;font-size:24px;
                font-weight:bold;color:#1e40af;">
        ${otp}
      </p>
      <p style="font-size:13px;color:#64748b;">
        Este código expira en 5 minutos. Si no solicitaste este correo, ignóralo.
      </p>
    `
  )
}

const sendMailResetPassword = (userMail, token) => {
  return sendMail(
    userMail,
    "Restablece tu contraseña - Ecuatechnology",
    `
      <h2 style="color:#1e293b;">¿Olvidaste tu contraseña?</h2>
      <p style="font-size:15px;color:#334155;">
        Hemos recibido una solicitud para restablecer tu contraseña. 
        Haz clic en el botón de abajo para crear una nueva contraseña segura:
      </p>
      <p style="text-align:center;margin:30px 0;">
        <a href="${process.env.URL_BACKEND}reset-password/${token}" 
           style="background:#1e40af;color:#ffffff;text-decoration:none;
           padding:12px 24px;border-radius:6px;font-size:16px;">
          Restablecer contraseña
        </a>
      </p>
      <p style="font-size:13px;color:#64748b;">
        Si no solicitaste este cambio, ignora este correo. 
        Tu contraseña actual seguirá funcionando.
      </p>
    `
  )
}

export {
  sendMailToRegister,
  sendMailOTP,
  sendMailResetPassword
}
