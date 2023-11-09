import { getConnection, sql, querysAuth, verifyToken } from './index.service';

export async function authenticate(req, res, next) {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(400).json({ message: 'Se requiere un token.', isError: true });
        }

        // Verifica el token
        const decodedToken = await verifyToken(token.split(" ")[1]);

        // Verifica los claims del token
        if (decodedToken.user_Id && decodedToken.session_Id) {
            const pool = await getConnection();
            const result = await pool.request()
                .input('Id', sql.UniqueIdentifier, decodedToken.user_Id)
                .input('Session_Id', sql.UniqueIdentifier, decodedToken.session_Id)
                .execute(querysAuth.ValidateUser);
            const validateUserResult = result.recordset[0];

            if (validateUserResult.Status === 200) {
                req.user = decodedToken; // Almacena los datos del usuario en el objeto 'req' para que estén disponibles en las rutas
                return next(); // Permite que la solicitud continúe si la autenticación es exitosa
            } else {
                return res.status(validateUserResult.Status).json({ message: validateUserResult.Message, isError: validateUserResult.IsError });
            }
        }

        // Si los claims no son válidos, o la validación del usuario falla, devolver un error
        return res.status(401).json({ message: 'Usuario no válido.', isError: true });
    } catch (error) {
        return res.status(500).json({ message: `Error en el servidor: ${error.message}`, isError: 1 });
    }
}
