import { getConnection, sql, querysAuth } from '../services/database/SqlConnection.service';
import { generateToken, authenticate } from '../services/auth/authenticate.service';

export const validateLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('StrUserName', sql.VarChar(100), username)
            .input('StrPassword', sql.VarChar(sql.MAX), password)
            .execute(querysAuth.validateLogin);
            const loginResult = result.recordset[0];

        if (loginResult.Status === 200) {
            // En caso de éxito, devolver los datos de inicio de sesión
            return res.status(loginResult.Status).json({
                userName: loginResult.StrUserName,
                isError: loginResult.IsError,
                token: generateToken({
                    user_Id: loginResult.Id,
                    session_Id: loginResult.Session_Id
                }, 86400)                
            });
        } else {
            // En caso de error, devolver el mensaje de error y el código de estado que envía la base de datos
            return res.status(loginResult.Status).json({ message: loginResult.Message, isError: loginResult.IsError });
        }
    } catch (error) {
        // Manejar errores generales del servidor
        return res.status(500).json({ message: `Error en el servidor: ${error.message}`, isError: 1 });
    }
};

export function getOTP(req, res) {

};

export function validateOTP(req, res) {

};

export async function changePasswordByOTP(req, res) {
    try {
      // Aquí implementa la lógica para cambiar la contraseña usando OTP
      // Puedes acceder a los datos del usuario autenticado a través de req.user
      // Por ejemplo, req.user.user_Id contiene el ID de usuario.
  
      // Realiza la lógica para cambiar la contraseña y responde según sea necesario.
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ message: `Error en el servidor: ${error.message}`, isError: 1 });
    }
  }
  
  